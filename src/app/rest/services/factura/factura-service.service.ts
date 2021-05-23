import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Factura } from '@modelsRest/Factura';
import { Observable } from 'rxjs';
import { appSettings } from '@core/helpers/appSettings';

@Injectable({
  providedIn: 'root',
})
export class FacturaServiceService {
  constructor(private _http: HttpClient) {}

  url = appSettings.apiUrl+ 'factura';
  urlFacturas = appSettings.apiUrl+ 'facturas';

  getFacturas(): Observable<any> {
    return this._http.get(this.url);
  }
  getFactura(factura:number):Observable<any>{
    return this._http.get<Factura>(this.url+"/"+factura);
  }

  deleteFactura(factura:Factura){
    return this._http.delete<Factura>(this.url+"/"+factura.id);
  }
  createFactura(factura:Factura):Observable<any>{
    return this._http.post<Factura>(this.url,factura);
  }

  updateFactura(factura: Factura): Observable<any> {
    return this._http.put<Factura>(this.url + "/" + factura.id, factura);
  }

  getFacturasByUsuarioId(id:number): Observable<any> {
    return this._http.get(this.urlFacturas + '/usuario/'+id);
  }

}
