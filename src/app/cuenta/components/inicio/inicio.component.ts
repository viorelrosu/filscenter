import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
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

  constructor() { 
    this.pageTitle = 'Mi Cuenta';
    this.pageDesc = 'Todo lo que necesitas de tu perfil';
    this.pageImg = 'login.jpg';
    this.title = 'Mi Cuenta';
    this.menuActive = 'inicio';
  }

  ngOnInit(): void {
  }

}
