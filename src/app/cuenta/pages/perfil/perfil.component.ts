import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../../components/menu/menu.component';
import { HelperService } from '@core/services/helper.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PageCuentaPerfilComponent implements OnInit {

  public pageTitle: string;
  public pageDesc: string;
  public pageImg: string;
  public title: string;
  public menuActive: string;

  // public sessionUser: any;
  // public isSuscribed: boolean = false;

  constructor(
    private _helperService: HelperService,
  ) {
    this.pageTitle = 'Mi Cuenta';
    this.pageDesc = 'Todo lo que necesitas de tu perfil';
    this.pageImg = 'login.jpg';
    this.title = 'Mi Cuenta';
    this.menuActive = 'perfil';
  }

  ngOnInit(): void {
    //window.location.reload();
    this._helperService.checkIsLoginAndRedirectToLogin();
    // this._helperService.getSessionUser()
    // .then((user:any)=>{
    //   this.sessionUser = user;
    // })
    // .then(()=>{
    //   this.isSuscribed = this.sessionUser.suscripcion.isSubscribed;
    //   //console.log(this.sessionUser);
    // });

    
  }

}
