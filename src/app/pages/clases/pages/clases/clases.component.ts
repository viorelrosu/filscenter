import { Component, OnInit } from '@angular/core';
import { CallToActionComponent } from '@shared/components/call-to-action/call-to-action.component';
import { AllClasesComponent } from '../../components/all-clases/all-clases.component';
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
    this.pageTitle = 'Nuestras Clases';
    this.pageDesc = 'Estamos aqui para ayudarte';
    this.pageImg = 'clases.jpg';
  }

  ngOnInit(): void {
  }

}
