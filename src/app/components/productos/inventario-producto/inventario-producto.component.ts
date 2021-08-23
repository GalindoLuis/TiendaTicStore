import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/service/producto.service';
declare var iziToast;
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {

  public id;
  public token;
  public _iduser;
  public producto:any={};
  public inventarios:Array<any>=[];
  public load_btn=false;
  public inventario:any={}
  constructor(
    private _route : ActivatedRoute,
    private _productoService:ProductoService
     
  ) { 
    this.token=localStorage.getItem('token');
    this._iduser=localStorage.getItem('_id');
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id=params['id'];
      
        this._productoService.obtener_producto_admin(this.id,this.token).subscribe(
          response=>{
            if(response.data==undefined){
              this.producto=undefined;
            }else{
              this.producto=response.data;
              this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
                response=>{
                  this.inventarios=response.data;
                },error=>{
                  console.log(error);
                }
              )
            }
          },error=>{
            console.log(error)
          }
        );
      }
    );

  }
  eliminar(id){
    this.load_btn=true;
    this._productoService.eliminar_inventario_producto_admin(id,this.token).subscribe(
      response=>{
        iziToast.show({
          title:'SUCCESS',
          titleColor:'#1DC74C',
          class:'text-success',
          color:'#FFF',
          position:'topRight',
          message:'Se elimino correctamente el producto'
        });
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.load_btn=false;
        this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
          response=>{
            this.inventarios=response.data;
          },error=>{
            console.log(error);
          }
        )
      },error=>{
        iziToast.show({
          title:'ERROR',
          titleColor:'#1DC74C',
          class:'text-danger',
          color:'#FFF',
          position:'topRight',
          message:'Ocurrio un error en el servidor'
        });
        console.log(error);
        this.load_btn=false;

      }
    )
  }
  registro_inventario(inventarioForm){
    if(inventarioForm.valid){
      let data={
        producto:this.producto._id,
        cantidad:inventarioForm.value.cantidad,
        admin:this._iduser, 
        proveedor:inventarioForm.value.proveedor,
         
      }
      this._productoService.registro_inventario_producto_admin(data,this.token).subscribe(
        response=>{
          iziToast.show({
            title:'SUCCESS',
            titleColor:'#1DC74C',
            class:'text-success',
            color:'#FFF',
            position:'topRight',
            message:'Se agrego el nuevo stock al producto'
          });
          this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
            response=>{
              this.inventarios=response.data;
            },error=>{
              console.log(error);
            }
          )
        },error=>{

        }
      )
    }else{
      iziToast.show({
        title:'ERROR',
        titleColor:'#FF0000',
        class:'text-danger',
        color:'#FFF',
        position:'topRight',
        message:'Los datos del formulario no son validos'
      });
    }
  }
}
