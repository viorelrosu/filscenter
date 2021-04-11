import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Suscripcion } from '@modelsRest/suscripcion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionServiceService {

  constructor(private _http:HttpClient) { }

  url="http://localhost:8080/webservice/suscripcion";

  getSuscripciones():Observable<any>{
    return this._http.get(this.url);
  }
  getSuscripcion(suscripcion:number):Observable<any>{
    return this._http.get<Suscripcion>(this.url+"/"+suscripcion);
  }

  deleteSuscripcion(suscripcion:Suscripcion){
    return this._http.delete<Suscripcion>(this.url+"/"+suscripcion.id);
  }

  createSuscripcion(suscripcion:Suscripcion):Observable<any>{
    return this._http.post<Suscripcion>(this.url,suscripcion);
  }
  updateSuscripcion(suscripcion:Suscripcion): Observable<any> {
    return this._http.put<Suscripcion>(this.url + "/" + suscripcion.id, suscripcion);
  }
}
