import { Component, OnInit } from '@angular/core';

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
    this.pageImg = 'contacto.jpg';
  }

  ngOnInit(): void {
  }

}
