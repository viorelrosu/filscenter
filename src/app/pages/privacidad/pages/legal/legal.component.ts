import { Component, OnInit } from '@angular/core';
import { CallToActionComponent } from '@shared/components/call-to-action/call-to-action.component';
@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})
export class PageLegalComponent implements OnInit {

  public pageTitle: string;
  public pageDesc: string;
  public pageImg: string;

  constructor() {
    this.pageTitle = 'Aviso legal';
    this.pageDesc = '';
    this.pageImg = 'aboutus.jpg';
  }

  ngOnInit(): void {
  }

}
