import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Localidad } from '@modelsRest/Localidad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalidadServiceService {

  constructor(private _http: HttpClient) {}

  url = 'http://localhost:8080/webservice/localidad';
  url2 = 'http://localhost:8080/webservice/localidades';

  getLocalidades(): Observable<any> {
    return this._http.get(this.url);
  }

  getLocalidad(localidad:number):Observable<any>{
    return this._http.get<Localidad>(this.url+"/"+localidad);
  }

  // carga localidades por el id de la provinicia vinculada
  getLocalidadesByProvinciaID(provincia:number):Observable<any>{
    return this._http.get<Localidad>(this.url2+"/"+provincia);
  }
}
