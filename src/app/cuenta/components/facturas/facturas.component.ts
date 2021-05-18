import { Component, OnInit } from '@angular/core';

import { HelperService } from '@core/services/helper.service';
import { FacturaServiceService as FacturaService } from "@servicesRest/factura/factura-service.service";
import { Factura } from "@modelsRest/Factura";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class PageCuentaFacturasComponent implements OnInit {
  public title: string = 'Mis Facturas';
  public sessionUser: any;
  public userFacturas: Factura[];
  public isDataLoaded: boolean = false;

  constructor(
    private _helperService: HelperService,
    private _facturaService: FacturaService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this._helperService.checkIsLoginAndRedirectToLogin();
    this._helperService.getSessionUser()
    .then((user:any)=>{
      this.sessionUser = user;
      console.log(this.sessionUser);
    })
    .then(()=>{
      this.loadFacturas();
    })
  }

  loadFacturas(){
    this._facturaService.getFacturasByUsuarioId(this.sessionUser.id).toPromise()
    .then((facturas)=>{
      this.userFacturas = facturas;
    })
    .then(()=>{
      console.log(this.userFacturas);
      this.isDataLoaded=true;
    });
  }

}
