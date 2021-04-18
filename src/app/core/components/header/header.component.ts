import { Component, OnInit } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { HelperService } from '@core/services/helper.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public sessionUser: any;
  public isLoggedIn: boolean = false;
  constructor(
    private _helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.sessionUser = this._helperService.getSessionUser();
    if(this.sessionUser && this.sessionUser.id) {
      this.isLoggedIn = true;
    }
  }

  logout(){
    //console.log('logout');
    this._helperService.logout()
  }

}
