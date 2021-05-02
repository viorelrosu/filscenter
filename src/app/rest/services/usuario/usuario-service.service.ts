import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuario } from "@modelsRest/Usuario";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsuarioServiceService {
  constructor(private _http: HttpClient) {}

  url = "http://localhost:8080/webservice/usuario";
  urlAlta = "http://localhost:8080/webservice/altaUsuario";
  
  getUsuarios(): Observable<any> {
    return this._http.get(this.url);
  }

  getUsuario(usuario: number): Observable<any> {
    return this._http.get<Usuario>(this.url + "/" + usuario);
  }

  getUsuarioByEmail(email: string): Observable<any> {
    return this._http.get<Usuario>(this.url + "/email/" + email);
  }

  deleteUsuario(usuario: Usuario) {
    return this._http.delete<Usuario>(this.url + "/" + usuario.id);
  }

  createUsuario(usuario: Usuario): Observable<any> {
    return this._http.post<Usuario>(this.url, usuario);
  }

  altaUser(usuario:Usuario) : Observable<any>{
    return this._http.post<Usuario>(this.urlAlta, usuario);
  }

  updateUsuario(usuario: Usuario): Observable<any> {
    return this._http.put<Usuario>(this.url + "/" + usuario.id, usuario);
  }
}
