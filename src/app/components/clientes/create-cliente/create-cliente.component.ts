import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { ClienteService } from 'src/app/service/cliente.service';
declare var iziToast;
@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {
  public cliente:any={
    genero: ''
  };
  public  token;
  public load_btn=false;
  constructor(
    private  _clienteService:ClienteService,
    private _adminService:AdminService,
    private _router:Router
  ) { 
    this.token=this._adminService.getToken();
  }

  ngOnInit(): void {
  }
  registro(registroForm){
    if(registroForm.valid){
      console.log(this.cliente);
      this.load_btn=true
      this._clienteService.registro_cliente_admin(this.cliente,this.token).subscribe(
        response=>{
          console.log(response);
          iziToast.show({
            title:'SUCCESS',
            titleColor:'#1DC74C',
            class:'text-success',
            color:'#FFF',
            position:'topRight',
            message:'Se registro correctamente el cliente'
          });
          this.cliente={
            genero:'',
            nombrbes:'',
            apellidos:'',
            f_nacimiento:'',
            dni:'',
            telefono:'',
            email:''
          }
          this.load_btn=false;
          this._router.navigate(['/panel/clientes']);
        },
        error=>{
          console.log(error);
        }
      );
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
