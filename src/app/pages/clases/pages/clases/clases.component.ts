import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class PageClasesComponent implements OnInit {

  public pageTitle: string;
  public pageDesc: string;
  public pageImg: string;

  constructor() {
    this.pageTitle = 'Nuestras clases';
    this.pageDesc = 'Estamos aqui para ayudarte';
    this.pageImg = 'contacto.jpg';
  }

  ngOnInit(): void {
  }

}
