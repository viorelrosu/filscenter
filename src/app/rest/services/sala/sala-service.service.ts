import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sala } from '@modelsRest/sala';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalaServiceService {
  constructor(private _http: HttpClient) {}

  url = 'http://localhost:8080/webservice/sala';

  getSalas(): Observable<any> {
    return this._http.get(this.url);
  }

  getSala(sala:number):Observable<any>{
    return this._http.get<Sala>(this.url+"/"+sala);
  }

  deleteSalas(sala:Sala){
    return this._http.delete<Sala>(this.url+"/"+sala.id);
  }

  createSala(sala:Sala):Observable<any>{
    return this._http.post<Sala>(this.url,sala);
  }
  
}
