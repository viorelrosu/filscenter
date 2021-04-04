import { Component, OnInit } from '@angular/core';
import { CallToActionComponent } from '@shared/components/call-to-action/call-to-action.component';
import { PlanesSuscripcionComponent } from '@shared/components/planes-suscripcion/planes-suscripcion.component';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class PageServiciosComponent implements OnInit {

  public pageTitle: string;
  public pageDesc: string;
  public pageImg: string;

  constructor() {
    this.pageTitle = 'Nuestros Servicios';
    this.pageDesc = 'Estamos aqui para ayudarte';
    this.pageImg = 'servicios.jpg';
  }

  ngOnInit(): void {
  }

}
