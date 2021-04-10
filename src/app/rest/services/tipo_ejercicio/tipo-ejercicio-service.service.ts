import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TipoEjercicio } from "@modelsRest/TipoEjercicio";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TipoEjercicioServiceService {
  constructor(private _http: HttpClient) {}

  url = "http://localhost:8080/webservice/tipoEjercicio";

  getTipoEjercicios(): Observable<any> {
    return this._http.get(this.url);
  }

  getTipoEjercicio(tipoEjercicio:number):Observable<any>{
    return this._http.get<TipoEjercicio>(this.url+"/"+tipoEjercicio);
  }

  updateTipoEjercicio(tipoEjercicio:TipoEjercicio):Observable<any>{
    return this._http.put<TipoEjercicio>(this.url+"/"+tipoEjercicio.id,tipoEjercicio);
  }
  deleteTipoEjercicio(tipoEjercicio: TipoEjercicio) {
    return this._http.delete<TipoEjercicio>(this.url + "/" + tipoEjercicio.id);
  }

  createTipoEjercicio(tipoEjercicio:TipoEjercicio):Observable<any>{
    return this._http.post<TipoEjercicio>(this.url,tipoEjercicio);
  }
}
