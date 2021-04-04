import { Component, OnInit } from '@angular/core';
import { ServicioComponent } from '@shared/components/servicio/servicio.component';
import { Servicio } from '@shared/models/servicio';
import { ServiciosService } from '@core/services';
@Component({
  selector: 'aboutus-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {
  public servicios: Array<Servicio>;
  constructor(
    private _serviciosService: ServiciosService
  ) { }

  ngOnInit(): void {
    this.servicios = this._serviciosService.getServicios(6);
  }

}
