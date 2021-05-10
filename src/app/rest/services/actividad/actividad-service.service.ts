import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Actividad } from "../../models/Actividad";
import { appSettings } from '@core/helpers/appSettings';

@Injectable({
  providedIn: "root",
})
export class ActividadServiceService {
  constructor(private _http: HttpClient) {}

  url = appSettings.apiUrl + 'actividad';

  getActividades(): Observable<any> {
    return this._http.get(this.url);
  }

  getActividad(actividad: number): Observable<any> {
    return this._http.get<Actividad>(this.url + "/" + actividad);
  }

  deleteActividad(actividad: Actividad): Observable<any> {
    return this._http.delete<Actividad>(this.url + "/" + actividad.id);
  }

  createActividad(actividad: Actividad): Observable<any> {
    return this._http.post<Actividad>(this.url, actividad);
  }

  updateActividad(actividad: Actividad): Observable<any> {
    return this._http.put<Actividad>(this.url + "/" + actividad.id, actividad);
  }
}
