import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '@modelsRest/Rol';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RolServiceService {

  
  constructor(private _http:HttpClient) { }

  url="http://localhost:8080/webservice/rol";

  getRoles():Observable<any>{
    return this._http.get(this.url);
  }

  getRol(rol:number):Observable<any>{
    return this._http.get<Rol>(this.url+"/"+rol);
  }

  deleteRol(rol:Rol){
    return this._http.delete<Rol>(this.url+"/"+rol.id);
  }

  createRol(rol:Rol):Observable<any>{
    return this._http.post<Rol>(this.url,rol);
  }
}
