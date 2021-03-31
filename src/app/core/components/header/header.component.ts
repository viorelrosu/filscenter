import { Component, OnInit } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public isLoggedIn: boolean;
  constructor() { 
    this.isLoggedIn = false;
  }
  ngOnInit(): void {
  }

}
