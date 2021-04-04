import { Component, OnInit } from '@angular/core';
import { ServicioComponent } from '@shared/components/servicio/servicio.component';
import { Servicio } from '@shared/models/servicio';
import { ServiciosService } from '@core/services';
@Component({
  selector: 'servicios-all',
  templateUrl: './all-servicios.component.html',
  styleUrls: ['./all-servicios.component.css']
})
export class AllServiciosComponent implements OnInit {
  public servicios: Array<Servicio>;
  constructor(
    private _serviciosService: ServiciosService
  ) { }

  ngOnInit(): void {
    this.servicios = this._serviciosService.findAll();
  }

}
