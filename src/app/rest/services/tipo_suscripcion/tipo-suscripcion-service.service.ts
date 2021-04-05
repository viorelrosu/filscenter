import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TipoSuscripcion } from "@modelsRest/TipoSuscripcion";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class TipoSuscripcionServiceService {
  constructor(private _http: HttpClient) {}

  url = "http://localhost:8080/webservice/tipoSuscripcion";

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
}
