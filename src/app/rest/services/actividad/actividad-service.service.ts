import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividad } from '../../models/Actividad';

@Injectable({
  providedIn: 'root',
})

export class ActividadServiceService {
  constructor(private _http: HttpClient) {}

  url = 'http://localhost:8080/webservice/actividad';

  getActividades(): Observable<any> {
    return this._http.get(this.url);
  }

  getActividad(actividad:number):Observable<any>{
    return this._http.get<Actividad>(this.url+"/"+actividad);
  }

  deleteActividad(actividad: Actividad):Observable<any> {
    return this._http.delete<Actividad>(this.url + '/' + actividad.id);
  }

  createActividad(actividad:Actividad):Observable<any>{
    return this._http.post<Actividad>(this.url,actividad);
  }
}
