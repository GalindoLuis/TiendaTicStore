import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { ClienteService } from 'src/app/service/cliente.service';

declare var iziToast;
@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {
  public cliente:any={};
  public id;
  public token;
  constructor( 
    private _route:ActivatedRoute,
    private _clienteService:ClienteService,
    private _adminService:AdminService,
    private _router:Router
  ) { 
    this.token=this._adminService.getToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this.id=params['id'];
      this._clienteService.obtener_cliente_admin(this.id,this.token).subscribe(
        response=>{
          console.log(response);
          if(response.data==undefined){
            this.cliente=undefined;
          }else{
            this.cliente=response.data;
          }
        },error=>{

        }
      )
    })
  }
  actualizar(updateForm){
    if(updateForm.valid){
      this._clienteService.actualizar_cliente_admin(this.id,this.cliente,this.token).subscribe(
        response=>{
          iziToast.show({
            title:'SUCCESS',
            titleColor:'#1DC74C',
            class:'text-success',
            color:'#FFF',
            position:'topRight',
            message:'Se actualizaron los datos'
          });
          this._router.navigate(['/panel/clientes']);
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
        message:'Los datos no son validos'
      });
    }
  }
}
