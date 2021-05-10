import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Suscripcion } from '@modelsRest/suscripcion';
import { Observable } from 'rxjs';
import { appSettings } from '@core/helpers/appSettings';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionServiceService {

  constructor(private _http:HttpClient) { }

  url= appSettings.apiUrl + "suscripcion";

  getSuscripciones():Observable<any>{
    return this._http.get(this.url);
  }
  getSuscripcionesByUsuarioId(userID:number):Observable<any>{
    return this._http.get(this.url + '/usuario/'+ userID);
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
