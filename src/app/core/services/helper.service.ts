import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
import { SuscripcionServiceService as SuscripcionService } from '@servicesRest/suscripcion/suscripcion-service.service';

declare var $:any;

@Injectable({
  providedIn: 'root'
})

export class HelperService {

  constructor(
    private _tokenStorageService: TokenStorageService,
    private _serviceRestSuscripcion: SuscripcionService,
    private _router: Router
  ) { }

  public checkIsLogin(){
    if (!this._tokenStorageService.getToken()) {
      return false;
    }
    return true;
  }

  public checkIsLoginAndRedirectToLogin(){
    if (!this._tokenStorageService.getToken()) {
      this._router.navigate(['/iniciar-sesion']);
    }
  }

  public checkIsLoginAndRedirectToCuenta(){
    if (this._tokenStorageService.getToken()) {
      this._router.navigate(['/cuenta/inicio']);
    }
  }

  public checkAndSaveSessionSubscription() {
    return new Promise(resolve=>{
      const user = this._tokenStorageService.getUser();
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
        this._tokenStorageService.saveUser(user);
      })
      .then(()=>{
        resolve(dataSuscripcion);
      });
    });
  }

  public getSessionUser(): any {
    return new Promise( resolve => {
      const user = this._tokenStorageService.getUser();
      if (user) {
        resolve(user);
      } else {
        resolve(false);
      }
    });
  }

  public isRolOK(rolExigido: string) {
    const user = this._tokenStorageService.getUser();
    if(user) {
      if(user.rol.nombre != rolExigido){
        this._router.navigate(['/inicio']);
      }
    }
  }

  public isNotRol(rolExigido: string) {
    const user = this._tokenStorageService.getUser();
    if(user) {
      if(user.rol.nombre == rolExigido){
        this._router.navigate(['/inicio']);
      }
    }
  }

  public logout(): any {
    this._tokenStorageService.signOut();
    
    $.notify({
      // options
      icon: 'fas fa-check',
      title: '¡Adiós!',
      message: 'Estamos cerrando tu sessión.',
    },{
      // settings
      type: 'success'
    });

    setTimeout(() => {
      this._router.navigate(['/inicio']).then(() => {
        window.location.reload();
      });
    }, 1000);
  }


}
