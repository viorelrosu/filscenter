import { Component, OnInit } from '@angular/core';

import * as aboutusComponents from '../../components';
import { CallToActionComponent } from '@shared/components/call-to-action/call-to-action.component';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
})
export class PageAboutusComponent implements OnInit {

  public pageTitle: string;
  public pageDesc: string;
  public pageImg: string;

  constructor() {
    this.pageTitle = 'Quiénes somos';
    this.pageDesc = 'Estamos aqui para ayudarte';
    this.pageImg = 'aboutus.jpg';
  }

  ngOnInit(): void {
  }

}
