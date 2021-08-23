import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { Observable } from "rxjs";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public url;
  constructor(private _http:HttpClient) {
    
    this.url=GLOBAL.url;
   }
   login_admin(data):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this._http.post(this.url+'login_admin',data,{headers});
   }
   getToken(){
     return localStorage.getItem('token');
   }
//validacion del token
   public isAuthenticated(allowRoles:string[]):boolean{
     const token=localStorage.getItem('token');//obtengo el token
     if(!token){
       return false;
     }
     try {
      //jwt decodifica el token que se obtinene en el localstorage
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);
      if(!decodedToken){
        localStorage.removeItem('token')
        return false;
      }
     } catch (error) {
      localStorage.removeItem('token')
      return false;
     }
    
    return allowRoles.includes(decodedToken['role']);

   }



  actualiza_config_admin(id,data,token):Observable<any>{
    if(data.logo){
      let headers=new HttpHeaders({'Authorization':token});
      const fd=new FormData();
      fd.append('titulo',data.titulo);
      fd.append('serie',data.serie);
      fd.append('correlativo',data.correlativo);
      fd.append('categorias',data.categorias);
      fd.append('logo',data.logo);
      return this._http.put(this.url+'actualiza_config_admin/'+id,fd,{headers:headers});
    }else{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'actualiza_config_admin/'+id,data,{headers:headers});
    }
  }
  obtener_config_admin(token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_config_admin',{headers:headers});
  }
}
