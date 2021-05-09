import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { HelperService } from '@core/services/helper.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class PageCuentaInicioComponent implements OnInit {

  public pageTitle: string;
  public pageDesc: string;
  public pageImg: string;
  public title: string;
  public menuActive: string;
  public isDataLoaded: boolean = false;

  public sessionUser: any;
  public isSuscribed: boolean = false;

  constructor(
    private _helperService: HelperService,
  ) { 
    this.pageTitle = 'Mi Cuenta';
    this.pageDesc = 'Todo lo que necesitas de tu perfil';
    this.pageImg = 'login.jpg';
    this.title = 'Gracias por volver';
    this.menuActive = 'inicio';
  }

  ngOnInit(): void {
    this._helperService.getSessionUser()
    .then((user:any)=>{
      this.sessionUser = user;
    })
    .then(()=>{
      this.isSuscribed = this.sessionUser.suscripcion.isSubscribed;
      if(!this.isSuscribed) {
        this.title = 'Sin suscripción';
      }
      //console.log(this.sessionUser);
    })
    .then(()=>{
      this.isDataLoaded=true;
    });
  }

}
