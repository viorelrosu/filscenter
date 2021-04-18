import { Component, OnInit } from '@angular/core';
import { HelperService } from '@core/services/helper.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class PageSignupComponent implements OnInit {

  public pageTitle: string;
  public pageDesc: string;
  public pageImg: string;

  constructor(
    private _helperService: HelperService,
  ) {
    this.pageTitle = 'Nueva Suscripción';
    this.pageDesc = 'Introduce tus datos';
    this.pageImg = 'registro.jpg';
  }

  ngOnInit(): void {
    this._helperService.checkIsLoginAndRedirectToCuenta();
  }

}
