import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TipoSuscripcion } from "@modelsRest/TipoSuscripcion";
import { Observable } from "rxjs";
import { appSettings } from '@core/helpers/appSettings';
@Injectable({
  providedIn: "root",
})
export class TipoSuscripcionServiceService {
  constructor(private _http: HttpClient) {}

  url = appSettings.apiUrl + "tipoSuscripcion";

  getTiposSuscripcion(): Observable<any> {
    return this._http.get(this.url);
  }

  getTipoSuscripcion(tipoSuscripcion:number):Observable<any>{
    return this._http.get<TipoSuscripcion>(this.url+"/"+tipoSuscripcion);
  }

  deleteTipoSuscripcion(tipoSuscripcion: TipoSuscripcion) {
    return this._http.delete<TipoSuscripcion>(
      this.url + "/" + tipoSuscripcion.id
    );
  }

  createTipoSuscripcion(tipoSuscripcion:TipoSuscripcion):Observable<any>{
    return this._http.post<TipoSuscripcion>(this.url,tipoSuscripcion);
  }

  updateTipoSuscripcion(tipoSuscripcion:TipoSuscripcion):Observable<any>{
    return this._http.put<TipoSuscripcion>(this.url+"/"+tipoSuscripcion.id,tipoSuscripcion);
  }
}
