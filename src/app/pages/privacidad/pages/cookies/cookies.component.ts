import { Component, OnInit } from '@angular/core';
import { CallToActionComponent } from '@shared/components/call-to-action/call-to-action.component';
@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css']
})
export class PageCookiesComponent implements OnInit {

  public pageTitle: string;
  public pageDesc: string;
  public pageImg: string;

  constructor() {
    this.pageTitle = 'Política de cookies';
    this.pageDesc = 'Sobre el uso de cookies';
    this.pageImg = 'aboutus.jpg';
  }

  ngOnInit(): void {
  }

}
