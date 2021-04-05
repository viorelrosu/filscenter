import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EjercicioSerie } from '@modelsRest/EjercicioSerie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjercicioSerieServiceService {

  constructor(private _http: HttpClient) {}

  url = 'http://localhost:8080/webservice/ejercicioSerie';

  getEjercicioSeries(): Observable<any> {
    return this._http.get(this.url);
  }

  deleteEjercicioSerie(ejercicioSerie:EjercicioSerie){
    return this._http.delete<EjercicioSerie>(this.url+"/"+ejercicioSerie.id)
  }

  createEjercicioSerie(ejercicioSerie:EjercicioSerie):Observable<any>{
    return this._http.post<EjercicioSerie>(this.url,ejercicioSerie);
  }
}
