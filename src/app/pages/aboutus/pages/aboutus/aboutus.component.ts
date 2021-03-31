import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class PageAboutusComponent implements OnInit {

  public pageTitle: string;
  public pageDesc: string;
  public pageImg: string;

  constructor() {
    this.pageTitle = 'Quiénes somos';
    this.pageDesc = 'Estamos aqui para ayudarte';
    this.pageImg = 'contacto.jpg';
  }

  ngOnInit(): void {
  }

}
