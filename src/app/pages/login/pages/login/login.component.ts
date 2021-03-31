import { Component, OnInit } from '@angular/core';
import { PagetitleComponent } from '@shared/components/pagetitle/pagetitle.component';
import { FormularioComponent } from '../../components/formulario/formulario.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class PageLoginComponent implements OnInit {
  public pageTitle: string;
  public pageDesc: string;
  public pageImg: string;

  constructor() {
    this.pageTitle = 'Iniciar Sesión';
    this.pageDesc = 'Introduce tus datos y accede a tu cuenta personal';
    this.pageImg = 'login.jpg';
  }

  ngOnInit(): void {
  }

}
