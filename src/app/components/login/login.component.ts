import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
declare var jQuery:any;
declare var $:any;
declare var iziToast;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public user:any={};
public usuario:any={};
public token:any='';
  constructor(
    private _adminService:AdminService, 
    private _router:Router) {
    this.token=this._adminService.getToken();
  //  $('body').attr('style','background:#000! important')
   }

  ngOnInit(): void {
    if(this.token){
      this._router.navigate(['/']);
    }else{
      
    }
  }
  login(loginForm){
    if(loginForm.valid){
      let data={
        email:this.user.email,
        password:this.user.password
      }
      this._adminService.login_admin(data).subscribe
      (response=>{
        if(response.data== undefined){
          iziToast.show({
            title:'ERROR',
            titleColor:'#FF0000',
            class:'text-danger',
            color:'#FFF',
            position:'topRight',
            message:response.message
          });
        }else{
          this.usuario=response.data;
          localStorage.setItem('token',response.token);
          localStorage.setItem('_id',response.data._id);
          this._router.navigate(['/']);

        }
        console.log(response)
      },
      error=>{
        console.log(error)
      
      }
      );
    }else{
      iziToast.show({
        title:'ERROR',
        titleColor:'#FF0000',
        class:'text-danger',
        color:'#FFF',
        position:'topRight',
        message:'Los datos no son correctos'
      });
    }
  }
}
