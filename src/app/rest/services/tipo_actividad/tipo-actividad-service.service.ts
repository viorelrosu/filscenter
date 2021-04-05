import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { TipoActividad } from '../../models/TipoActividad';


@Injectable({
  providedIn: 'root'
})
export class TipoActividadServiceService {

  constructor(private http:HttpClient) { }

  url="http://localhost:8080/webservice/tipoActividad";
  //coger todas las actividades
  getTipoActividades():Observable<any>{
    return this.http.get<TipoActividad>(this.url);
  }
  //coger una actividad
  getTipoActividad(tipoActividad:number):Observable<TipoActividad>{
    return this.http.get<TipoActividad>(this.url+"/"+tipoActividad);
  }

  deleteTipoActividad(tipoActividad:TipoActividad):Observable<any>{
    return this.http.delete<TipoActividad>(this.url+"/"+tipoActividad.id);
  }

  createTipoActividad(tipoActividad:TipoActividad):Observable<any>{
    return this.http.post<TipoActividad>(this.url,tipoActividad);
  }
  
}
