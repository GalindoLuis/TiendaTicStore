import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/service/GLOBAL';
import { ProductoService } from 'src/app/service/producto.service';
declare var  iziToast;
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit {
  public producto :any={};
  public config : any={};
  public imgSelect:String | ArrayBuffer;
  public load_btn=false;
  public id;
  public token;
  public url;
  public file:File=undefined;
  
  constructor(
    private _router:Router,
    private _route:ActivatedRoute,
    private _productoService:ProductoService
  ) {
    this.config={
      height:500
    }
    this.token=localStorage.getItem('token');
    this.url=GLOBAL.url;
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id=params['id'];
        console.log(this.id);
        this._productoService.obtener_producto_admin(this.id,this.token).subscribe(
          response=>{
            if(response==undefined){
              this.producto=undefined;
            }else{
              this.producto=response.data;
              this.imgSelect  = this.url+'obtener_portada/'+this.producto.portada;

            }
          },error=>{

          }
        );
      }
    );
  }
  actualizar(actualizarForm){
    if(actualizarForm.valid){

      var data:any ={};

      if(this.file !=undefined){
        data.portada=this.file;
      }

      data.titulo=this.producto.titulo;
      data.stock=this.producto.stock;
      data.precio=this.producto.precio;
      data.categoria=this.producto.categoria;
      data.descripcion=this.producto.descripcion;
      data.contenido=this.producto.contenido;
      this.load_btn=true;

      this._productoService.actualizar_producto_admin(data,this.id,this.token).subscribe(
        response=>{
          iziToast.show({
            title:'SUCCESS',
            titleColor:'#1DC74C',
            class:'text-success',
            color:'#FFF',
            position:'topRight',
            message:'Se actualizo correctamente el cliente'
          });
          this.load_btn=false;
          this._router.navigate(['/panel/productos']);
        },error=>{
          console.log(error);
          this.load_btn=false;
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
      this.load_btn=false;
    }
  }
  fileChangeEvent(event:any):void{
    var file;
    if(event.target.files && event.target.files[0]){
      file=<File>event.target.files[0];
     
    }else{
      iziToast.show({
        title:'ERROR',
        titleColor:'#FF0000',
        class:'text-danger',
        color:'#FFF',
        position:'topRight',
        message:'Sin imagen de envio'
      });
    }
    if(file.size<=40000000){
      if(file.type == 'image/png'|| file.type =='image/webp'||file.type =='image/jpg'||file.type =='image/gif'||file.type =='image/jpeg'){
        const reader= new FileReader();
        reader.onload=e=>this.imgSelect=reader.result;
        reader.readAsDataURL(file);
        $('#input-portada').text(file.name);
        this.file=file;
        
      }else{
        iziToast.show({
          title:'ERROR',
          titleColor:'#FF0000',
          class:'text-danger',
          color:'#FFF',
          position:'topRight',
          message:'Solo se permite formatos png/webp/jpg/gif/jpeg'
        });
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect='assets/img/01.jpg';
      this.file=undefined;
      }
    }else{
      iziToast.show({
        title:'ERROR',
        titleColor:'#FF0000',
        class:'text-danger',
        color:'#FFF',
        position:'topRight',
        message:'La imagen no puede superar los 4mb'
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect='assets/img/01.jpg';
      this.file=undefined;

    }
    console.log()
  }
}
