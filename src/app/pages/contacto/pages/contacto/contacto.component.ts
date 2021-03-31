import { Component, OnInit } from '@angular/core';
import { ContenidoComponent } from '../../components/contenido/contenido.component';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class PageContactoComponent implements OnInit {

  public pageTitle: string;
  public pageDesc: string;
  public pageImg: string;

  constructor() {
    this.pageTitle = 'Contacto';
    this.pageDesc = 'Estamos aqui para ayudarte';
    this.pageImg = 'contacto.jpg';
  }

  ngOnInit(): void {
  }

}
