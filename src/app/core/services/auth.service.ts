import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appSettings } from '@core/helpers/appSettings';

//const AUTH_API = 'http://localhost:8080/webservice/';
const AUTH_API = appSettings.apiUrl;


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
  constructor(private _http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this._http.post(AUTH_API + 'authenticate', {
      username,
      password
    }, httpOptions);
  }

  register(data: any): Observable<any> {
    return this._http.post(AUTH_API + 'signup', {data}, httpOptions);
  }
}