import { Component, OnInit, Input } from '@angular/core';
import { TokenStorageService } from '@core/services/token-storage.service';

@Component({
  selector: 'cuenta-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public active: string;
  public sessionUser: any;

  @Input() menuActive: string;

  constructor(
    private _tokenStorage: TokenStorageService
  ) { 
    this.active = 'datos';
    this.sessionUser = this._tokenStorage.getUser();
  }

  ngOnInit(): void {
    if(this.menuActive) {
      this.active = this.menuActive;
    }
  }

}
