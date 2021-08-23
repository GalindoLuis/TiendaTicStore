import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { ProductoService } from 'src/app/service/producto.service';

declare var jQuery:any;
declare var $:any;
declare var iziToast;
@Component({
  selector: 'app-create-producos',
  templateUrl: './create-productos.component.html',
  styleUrls: ['./create-productos.component.css']
})
export class CreateProductosComponent implements OnInit {
  public producto:any={
    categoria:''
  };
  public file:any=undefined;
  public imgSelect:any | ArrayBuffer='assets/img/01.jpg';
  public config:any={};
  public token;
  public load_btn=false;
  constructor(
    private _productoService:ProductoService,
    private _adminService:AdminService,
    private _router:Router
  ) { 
    this.config={
      height:500
    }
    this.token=this._adminService.getToken();
  }

  ngOnInit(): void {
  }
  registro(registroForm){
    if(registroForm.valid){
      if(this.file==undefined){
        iziToast.show({
          title:'ERROR',
          titleColor:'#FF0000',
          class:'text-danger',
          color:'#FFF',
          position:'topRight',
          message:'Debe subir una portada para registrar'
        });
      }else{
        console.log(this.producto);
      console.log(this.file);
      this.load_btn=true;
      this._productoService.registro_producto_admin(this.producto,this.file,this.token).subscribe(
        response=>{
          console.log('response');
          iziToast.show({
            title:'SUCCESS',
            titleColor:'#1DC74C',
            class:'text-success',
            color:'#FFF',
            position:'topRight',
            message:'Se registro correctamente el cliente'
          });
          this.load_btn=false;
          this._router.navigate(['/panel/productos']);
        },error=>{
          console.log('error');
          this.load_btn=false;
        }
      );
      }
    }else{
      iziToast.show({
        title:'ERROR',
        titleColor:'#FF0000',
        class:'text-danger',
        color:'#FFF',
        position:'topRight',
        message:'Los datos no son validos'
      });
      this.load_btn=false;
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect='assets/img/01.jpg';
      this.file=undefined;
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
