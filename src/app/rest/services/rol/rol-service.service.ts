import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '@modelsRest/Rol';
import {Observable} from "rxjs";
import { appSettings } from '@core/helpers/appSettings';

@Injectable({
  providedIn: 'root'
})
export class RolServiceService {

  
  constructor(private _http:HttpClient) { }

  url= appSettings.apiUrl + "rol";

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

  updateRol(rol: Rol): Observable<any> {
    return this._http.put<Rol>(this.url + "/" + rol.id, rol);
  }
}
