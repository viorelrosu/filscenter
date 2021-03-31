import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cuenta-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public active: string;

  @Input() menuActive: string;

  constructor() { 
    this.active = 'datos';
    if(this.menuActive) {
      this.active = this.menuActive;
    }
  }

  ngOnInit(): void {
  }

}
