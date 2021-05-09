import { Component, OnInit } from '@angular/core';
import { HelperService } from '@core/services/helper.service';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  public sessionUser: any;
  public isLoginIn: boolean = false;
  constructor(
    private _helperService: HelperService
  ) { }

  ngOnInit(): void {
    this._helperService.getSessionUser()
    .then((user:any)=>{
      this.sessionUser = user;
    })
    .then(()=>{
      this.isLoginIn = this._helperService.checkIsLogin();
    });
  }

  logout(){
    //console.log('logout');
    this._helperService.logout()
  }

}
