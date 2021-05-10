import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EjercicioSerie } from '@modelsRest/EjercicioSerie';
import { Observable } from 'rxjs';
import { appSettings } from '@core/helpers/appSettings';

@Injectable({
  providedIn: 'root'
})
export class EjercicioSerieServiceService {

  constructor(private _http: HttpClient) {}

  url = appSettings.apiUrl + 'ejercicioSerie';
  url2 = appSettings.apiUrl + 'ejercicioSerieTabla';

  getEjercicioSeries(): Observable<any> {
    return this._http.get(this.url);
  }

  getEjercicioSerie(ejercicioSerie:number):Observable<any>{
    return this._http.get<EjercicioSerie>(this.url+"/"+ejercicioSerie);
  }

  getEjerciciosPorTablaId(tablaid:number):Observable<any>{
    return this._http.get<EjercicioSerie>(this.url2+"/"+tablaid)
  }

  deleteEjercicioSerie(ejercicioSerie:EjercicioSerie){
    return this._http.delete<EjercicioSerie>(this.url+"/"+ejercicioSerie.id)
  }

  createEjercicioSerie(ejercicioSerie:EjercicioSerie):Observable<any>{
    return this._http.post<EjercicioSerie>(this.url,ejercicioSerie);
  }


  updateEjercicioSerie(ejercicioSerie: EjercicioSerie): Observable<any> {
    return this._http.put<EjercicioSerie>(this.url + "/" + ejercicioSerie.id, ejercicioSerie);
  }
}
