import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Factura } from '@modelsRest/Factura';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacturaServiceService {
  constructor(private _http: HttpClient) {}

  url = 'http://localhost:8080/webservice/factura';

  getFacturas(): Observable<any> {
    return this._http.get(this.url);
  }

  deleteFactura(factura:Factura){
    return this._http.delete<Factura>(this.url+"/"+factura.id);
  }
  createFactura(factura:Factura):Observable<any>{
    return this._http.post<Factura>(this.url,factura);
  }
}
