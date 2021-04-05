import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Direccion } from '@modelsRest/Direccion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DireccionServiceService {

  constructor(private _http: HttpClient) {}

  url = 'http://localhost:8080/webservice/direccion';

  getDirecciones(): Observable<any> {
    return this._http.get(this.url);
  }

  deleteDireccion(direccion:Direccion){
    return this._http.delete<Direccion>(this.url+"/"+direccion.id)
  }

  createDireccion(direccion:Direccion):Observable<any>{
    return this._http.post<Direccion>(this.url,direccion);
  }
}
