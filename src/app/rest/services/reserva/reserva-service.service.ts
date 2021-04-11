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

  getReserva(reserva:number):Observable<any>{
    return this._http.get<Reserva>(this.url+"/"+reserva);
  }

  deleteReserva(reserva:Reserva){
    return this._http.delete<Reserva>(this.url+"/"+reserva.id);
  }

  createReserva(reserva:Reserva):Observable<any>{
    return this._http.post<Reserva>(this.url,reserva);
  }

  updateReserva(reserva: Reserva): Observable<any> {
    return this._http.put<Reserva>(this.url + "/" + reserva.id, reserva);
  }
}
