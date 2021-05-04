import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ejercicio } from '@modelsRest/Ejercicio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjercicioServiceService {

  constructor(private _http: HttpClient) {}

  url = 'http://localhost:8080/webservice/ejercicio';
  url2 = 'http://localhost:8080/webservice/ejercicios';

  getEjercicios(): Observable<any> {
    return this._http.get(this.url);
  }

  getEjercicio(ejercicio:number):Observable<any>{
    return this._http.get<Ejercicio>(this.url+"/"+ejercicio)
  }

  getEjerciciosPorTipoEjercicioId(tipoEjercicio:number):Observable<any>{
    return this._http.get<Ejercicio>(this.url2+"/"+tipoEjercicio);
  }

  deleteEjercicio(ejercicio:Ejercicio){
    return this._http.delete<Ejercicio>(this.url+"/"+ejercicio.id);
  }

  createEjercicio(ejercicio:Ejercicio):Observable<any>{
    return this._http.post<Ejercicio>(this.url,ejercicio);
  }

  updateEjercicio(ejercicio: Ejercicio): Observable<any> {
    return this._http.put<Ejercicio>(this.url + "/" + ejercicio.id, ejercicio);
  }
}
