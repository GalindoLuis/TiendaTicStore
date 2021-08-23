import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { v4 as uuidv4 } from 'uuid';
declare var iziToast;
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
public token;
public config:any={};

public titulo_cat='';
public icono_cat='';
public file:File=undefined;
 public imgSelect:String | ArrayBuffer;
  constructor(private _adminService:AdminService) { 
    this.token=localStorage.getItem('token');
    this._adminService.obtener_config_admin(this.token).subscribe(
      response=>{
        this.config=response.data;
      },error=>{
        console.log(error);
      }
      )
  }

  ngOnInit(): void {
 
  }
  agregar_cat(){
    if(this.titulo_cat && this.icono_cat){
      this.config.categorias.push({
        titulo:this.titulo_cat,
        icono:this.icono_cat,
        _id:uuidv4()
      });
      this.titulo_cat='';
      this.icono_cat='';
    }else{
      iziToast.show({
        title:'ERROR',
        titleColor:'#FF0000',
        class:'text-danger',
        color:'#FFF',
        position:'topRight',
        message:'Debe ingresar titulo e icono para la categoria'
      });
    }
  }

  actualizar(confForm){
  
    if(confForm.valid){
      let data={
        titulo:confForm.value.titulo,
        serie:confForm.value.serie,
        correlativo:confForm.value.correlativo,
        categorias:this.config.categorias,
        logo:this.file

      }
      console.log(data);
      this._adminService.actualiza_config_admin("6121e71390558a20f45cddf4",data,this.token).subscribe(
        response=>{
            console.log(response);
            iziToast.show({
              title:'SUCCESS',
              titleColor:'#1DC74C',
              class:'text-success',
              color:'#FFF',
              position:'topRight',
              message:'Se actualizo correctamente la configuración'
            });
        }
      )
      
    }else{
      iziToast.show({
        title:'ERROR',
        titleColor:'#FF0000',
        class:'text-danger',
        color:'#FFF',
        position:'topRight',
        message:'Debe ingresar titulo e icono para la categoria'
      });
    }
  }

 fileChangeEvent(event){
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
    if(file.size<=400000000){
      if(file.type == 'image/png'|| file.type =='image/webp'||file.type =='image/jpg'||file.type =='image/gif'||file.type =='image/jpeg'){
        const reader= new FileReader();
        reader.onload=e=>this.imgSelect=reader.result;
        console.log(this.imgSelect);
        
        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbail rounded');
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
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
   
  }
  ngDoCheck():void{
    $('.cs-file-drop-preview').html("<img src="+this.imgSelect+">");
  }

}
