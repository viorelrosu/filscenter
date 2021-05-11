import { Injectable } from '@angular/core';
import { SuscripcionServiceService as SuscripcionService } from '@servicesRest/suscripcion/suscripcion-service.service';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(
    private _serviceRestSuscripcion: SuscripcionService,
  ) { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any) {
    return new Promise(resolve=>{
      user.isAdmin = (user.rol.nombre  == 'admin') ? true : false;
      user.isMonitor = (user.rol.nombre  == 'monitor') ? true : false;
      var dataSuscripcion:any = { isSubscribed: false, suscripcion: {} }

      this._serviceRestSuscripcion.getSuscripcionesByUsuarioId(user.id).toPromise()
      .then((suscripciones)=>{
        //console.log(suscripciones);
        if(suscripciones != null) {
          for(let item of suscripciones) {
            if(item.fechaBaja == null) {
              //no tiene fecha de baja por lo tanto esta suscrito.
              dataSuscripcion.isSubscribed = true;
              dataSuscripcion.suscripcion = item;

            } else {

              //tiene fecha de baja y comprobamos si es todavia es activa la suscripción
              var dateBaja = item.fechaBaja.substring(0,10);
              var today = new Date();
              var fechaBaja = new Date(dateBaja.substring(0,4), dateBaja.substring(5,7)-1, dateBaja.substring(8,10));

              if(fechaBaja.getTime() >= today.getTime()) {
                dataSuscripcion.isSubscribed = true;
                dataSuscripcion.suscripcion = item;
              }
            };
          }
        }
      })
      .then(()=>{
        user.suscripcion = dataSuscripcion;
      })
      .then(()=>{
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      })
      .then(()=>{
        resolve(user);
      });
    });
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}