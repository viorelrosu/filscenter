import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Provincia } from '@modelsRest/Provincia';
import { Observable } from 'rxjs';
import { appSettings } from '@core/helpers/appSettings';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaServiceService {

  constructor(private _http: HttpClient) {}

  url = appSettings.apiUrl + 'provincia';

  getProvincias(): Observable<any> {
    return this._http.get<Provincia>(this.url);
  }

  getProvincia(provincia:number):Observable<any>{
    return this._http.get<Provincia>(this.url+"/"+provincia);
  }
}
