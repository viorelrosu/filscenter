import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadServiceService as ActividadService } from '@servicesRest/actividad/actividad-service.service';
import { Actividad } from '@modelsRest/Actividad';
@Component({
  selector: 'clases-all-clases',
  templateUrl: './all-clases.component.html',
  styleUrls: ['./all-clases.component.css'],
  providers: [ActividadService]
})
export class AllClasesComponent implements OnInit {
  public actividades: Array<Actividad>;

  constructor(
    private _router: Router,
    private _actividadService: ActividadService
  ) { 

    this._actividadService.getActividades().subscribe((data) => {
      this.actividades = data;
    });

  }

  ngOnInit(): void {

  }

  redirectHorario() {
    this._router.navigate(['/horario']);
  }

}
