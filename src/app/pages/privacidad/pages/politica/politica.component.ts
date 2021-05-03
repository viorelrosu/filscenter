import { Component, OnInit } from '@angular/core';
import { CallToActionComponent } from '@shared/components/call-to-action/call-to-action.component';
@Component({
  selector: 'app-politica',
  templateUrl: './politica.component.html',
  styleUrls: ['./politica.component.css']
})
export class PagePoliticaComponent implements OnInit {

  public pageTitle: string;
  public pageDesc: string;
  public pageImg: string;

  constructor() {
    this.pageTitle = 'Política de privacidad';
    this.pageDesc = 'Tus datos son importantes';
    this.pageImg = 'aboutus.jpg';
  }

  ngOnInit(): void {
  }

}
