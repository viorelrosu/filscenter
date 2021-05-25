import { Component, OnInit } from '@angular/core';
import { VersionCheckService } from '@core/services/version-check.service';
import { environment } from '../environments/environment';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title = 'filscenter';

  constructor(
    private _versionCheckService: VersionCheckService
  ) {
  }

  ngOnInit() {
    this.loadJs();
    this._versionCheckService.initVersionCheck(environment.versionCheckURL);
  }

  loadJs() {
    const dynamicScripts = [
      'assets/js/functions.js',
      // "//maps.googleapis.com/maps/api/js?key=AIzaSyAZIus-_huNW25Jl7RPmHgoGZjD5udgBMI",
      // "assets/js/plugins/gmap3/gmap3.min.js",
      // "assets/js/plugins/gmap3/map-styles.js"
    ];

    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

}
