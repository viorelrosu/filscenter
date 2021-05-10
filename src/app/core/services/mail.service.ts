import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactoUsuario } from '@shared/models/contacto.usuario';
import { appSettings } from '@core/helpers/appSettings';

const url = appSettings.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MailService {
    
  constructor(private _http: HttpClient) { }

  contactoSend(mensaje:ContactoUsuario): Observable<any> {
    return this._http.post<ContactoUsuario>(url+'contactForm',mensaje);
  }

  resetPass(email:string): Observable<any> {
    return this._http.post(url+'resetPassword',email);
  }

}