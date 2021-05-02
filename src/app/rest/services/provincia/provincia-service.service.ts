import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Provincia } from '@modelsRest/Provincia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaServiceService {

  constructor(private _http: HttpClient) {}

  url = 'http://localhost:8080/webservice/provincia';

  getProvincias(): Observable<any> {
    return this._http.get<Provincia>(this.url);
  }

  getProvincia(provincia:number):Observable<any>{
    return this._http.get<Provincia>(this.url+"/"+provincia);
  }
}
