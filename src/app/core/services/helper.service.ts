import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private _tokenStorageService: TokenStorageService,
    private _router: Router
  ) { }

  checkIsLogin(){
    if (!this._tokenStorageService.getToken()) {
      return false;
    }
    return true;
  }

  checkIsLoginAndRedirectToLogin(){
    if (!this._tokenStorageService.getToken()) {
      this._router.navigate(['/login']);
    }
  }

  checkIsLoginAndRedirectToCuenta(){
    if (this._tokenStorageService.getToken()) {
      this._router.navigate(['/cuenta']);
    }
  }

  public getSessionUser(): any {
    const user = this._tokenStorageService.getUser();
    if (user) {
      return user;
    }

    return {};
  }

  public isRolOK(rolExigido: string) {
    const user = this._tokenStorageService.getUser();
    if(user) {
      if(user.rol.nombre != rolExigido){
        this._router.navigate(['/inicio']);
      }
    }
  }

  public logout(): any {
    this._tokenStorageService.signOut();
    this._router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
  }


}
