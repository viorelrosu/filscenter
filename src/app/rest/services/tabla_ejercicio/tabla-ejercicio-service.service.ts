import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TablaEjercicio } from "@modelsRest/TablaEjercicio";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TablaEjercicioServiceService {
  constructor(private _http: HttpClient) {}

  url = "http://localhost:8080/webservice/tablaEjercicio";

  getTablasEjercicios(): Observable<any> {
    return this._http.get(this.url);
  }

  getTablaEjercicio(tablaEjercicio:number):Observable<any>{
    return this._http.get<TablaEjercicio>(this.url+"/"+tablaEjercicio);
  }


  deleteTablaEjercicio(tablaEjercicio: TablaEjercicio) {
    return this._http.delete<TablaEjercicio>(this.url + "/" + tablaEjercicio.id);
  }
}
