import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuponService } from 'src/app/service/cupon.service';
declare var iziToast;
@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit {
  public token;
  public cupon: any={
    tipo:''
  };
  public load_btn=false;

  constructor(
    private _cuponService:CuponService,
    private _router:Router) { 
      this.token=localStorage.getItem('token');
    }

  ngOnInit(): void {
  }
  registro(registroForm){
    if(registroForm.valid){
      this.load_btn=true;
      this._cuponService.registro_cupon_admin(this.cupon,this.token).subscribe(
        response=>{
          iziToast.show({
            title:'SUCCESS',
            titleColor:'#1DC74C',
            class:'text-success',
            color:'#FFF',
            position:'topRight',
            message:'Se registro correctamente el cupón'
          });
          this.load_btn=false;
          this._router.navigate(['panel/cupones']);
        },error=>{
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
        message:'Los datos no son validos'
      });
    }
  }
}
