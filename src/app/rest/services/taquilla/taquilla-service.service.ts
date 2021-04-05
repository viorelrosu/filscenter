import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Taquilla } from '@modelsRest/Taquilla';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaquillaServiceService {

  constructor(private _http:HttpClient) { }

  url="http://localhost:8080/webservice/taquilla";

  getTaquillas():Observable<any>{
    return this._http.get(this.url);
  }

  deleteTaquilla(taquilla:Taquilla){
    return this._http.delete<Taquilla>(this.url+"/"+taquilla.id);
  }

  createTaquilla (taquilla:Taquilla):Observable<any>{
    return this._http.post<Taquilla>(this.url,taquilla);
  }
}
