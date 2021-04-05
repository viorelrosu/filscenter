import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '@modelsRest/Reserva';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservaServiceService {

    
  constructor(private _http:HttpClient) { }

  url="http://localhost:8080/webservice/reserva";

  getreservas():Observable<any>{
    return this._http.get(this.url);
  }

  deleteReserva(reserva:Reserva){
    return this._http.delete<Reserva>(this.url+"/"+reserva.id);
  }

  createReserva(reserva:Reserva):Observable<any>{
    return this._http.post<Reserva>(this.url,reserva);
  }
}
