import { Component, OnInit } from '@angular/core';
import { FormularioComponent } from '../../components/formulario/formulario.component';
@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class PageRecoverComponent implements OnInit {

  public pageTitle: string;
  public pageDesc: string;
  public pageImg: string;

  constructor() {
    this.pageTitle = 'Recuperar Contraseña';
    this.pageDesc = '¿Necesitas una nueva contraseña?';
    this.pageImg = 'login.jpg';
  }

  ngOnInit(): void {
  }

}
