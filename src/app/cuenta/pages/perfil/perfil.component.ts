import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../../components/menu/menu.component';
import { TokenStorageService } from '@core/services/token-storage.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PagePerfilComponent implements OnInit {

  public pageTitle: string;
  public pageDesc: string;
  public pageImg: string;
  public title: string;
  public menuActive: string;

  public isLoggedIn: boolean = true;
  public sessionUser: any;

  constructor(
    private _tokenStorageService: TokenStorageService,
    private _router: Router
    ) {
    this.pageTitle = 'Mi Cuenta';
    this.pageDesc = 'Todo lo que necesitas de tu perfil';
    this.pageImg = 'login.jpg';
    this.title = 'Mis Datos';
    this.menuActive = 'datos';
  }

  ngOnInit(): void {
    if (this._tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.sessionUser = this._tokenStorageService.getUser();
    } 
    this.redirectToLogin();
  }

  redirectToLogin() {
    if(!this.isLoggedIn) {
      this._router.navigate(['/iniciar-sesion']);
    }
  }

}
