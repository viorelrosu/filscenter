import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class PageSignupComponent implements OnInit {

  public pageTitle: string;
  public pageDesc: string;
  public pageImg: string;

  constructor() {
    this.pageTitle = 'Nueva Suscripción';
    this.pageDesc = 'Introduce tus datos';
    this.pageImg = 'login.jpg';
  }

  ngOnInit(): void {
  }

}
