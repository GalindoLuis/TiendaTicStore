import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/service/cupon.service';
declare var iziToast;
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css']
})
export class IndexCuponComponent implements OnInit {
public load_data=true;
public page = 1;
public pageSize=20;
public token;
public cupones:Array<any>=[];
public filtro='';
  constructor(
    private _cuponService:CuponService
  ) {
    this.token=localStorage.getItem('token');
   }

  ngOnInit(): void {   
    this._cuponService.listar_cupones_admin(this.filtro,this.token).subscribe(
      response=>{
        this.cupones=response.data;
        this.load_data=false;
      },error=>{

      })
  }
 
filtrar(){
  this._cuponService.listar_cupones_admin(this.filtro,this.token).subscribe(
    response=>{
      this.cupones=response.data;
      this.load_data=false;
    },error=>{

    })

}
eliminar(id){
  this._cuponService.eliminar_cupon_admin(id,this.token).subscribe(
    response=>{
      iziToast.show({
        title:'SUCCESS',
        titleColor:'#1DC74C',
        class:'text-success',
        color:'#FFF',
        position:'topRight',
        message:'Se elimino correctamente el cupón'
      });
      $('#delete-'+id).modal('hide');
      $('.modal-backdrop').removeClass('show');
      this._cuponService.listar_cupones_admin(this.filtro,this.token).subscribe(
        response=>{
          this.cupones=response.data;
          this.load_data=false;
        },error=>{
  
        })
    },error=>{
      console.log(error);
      
    }
  )
}
}
