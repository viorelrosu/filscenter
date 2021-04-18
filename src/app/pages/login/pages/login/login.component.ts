import { Component, OnInit } from '@angular/core';
import { PagetitleComponent } from '@shared/components/pagetitle/pagetitle.component';
import { FormularioComponent } from '../../components/formulario/formulario.component';
import { HelperService } from '@core/services/helper.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class PageLoginComponent implements OnInit {
  public pageTitle: string;
  public pageDesc: string;
  public pageImg: string;

  public isLoggedIn: boolean = true;
  public sessionUser: any;

  constructor(
    private _helperService: HelperService,
  ) {
    this.pageTitle = 'Iniciar Sesión';
    this.pageDesc = 'Introduce tus datos y accede a tu cuenta personal';
    this.pageImg = 'login.jpg';
  }

  ngOnInit(): void {
    this._helperService.checkIsLoginAndRedirectToCuenta();
  }

}
