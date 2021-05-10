import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { TipoActividad } from '../../models/TipoActividad';
import { appSettings } from '@core/helpers/appSettings';


@Injectable({
  providedIn: 'root'
})
export class TipoActividadServiceService {

  constructor(private _http:HttpClient) { }

  url= appSettings.apiUrl + "tipoActividad";
  //coger todas las actividades
  getTipoActividades():Observable<any>{
    return this._http.get<TipoActividad>(this.url);
  }
  //coger una actividad
  getTipoActividad(tipoActividad:number):Observable<TipoActividad>{
    return this._http.get<TipoActividad>(this.url+"/"+tipoActividad);
  }

  deleteTipoActividad(tipoActividad:TipoActividad):Observable<any>{
    return this._http.delete<TipoActividad>(this.url+"/"+tipoActividad.id);
  }

  createTipoActividad(tipoActividad:TipoActividad):Observable<any>{
    return this._http.post<TipoActividad>(this.url,tipoActividad);
  }

  updateTipoActividad(tipoActividad:TipoActividad):Observable<any>{
    return this._http.put<TipoActividad>(this.url+"/"+tipoActividad.id,tipoActividad);
  }
  
}
