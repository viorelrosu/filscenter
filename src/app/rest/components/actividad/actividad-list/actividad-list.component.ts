import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Actividad } from "@modelsRest/Actividad";
import { ActividadServiceService } from "@servicesRest/actividad/actividad-service.service";

@Component({
  selector: "app-actividad-list",
  templateUrl: "./actividad-list.component.html",
  styleUrls: ["./actividad-list.component.css"],
})
export class ActividadListComponent implements OnInit {
  actividades: Actividad[];

  constructor(
    private service: ActividadServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.getElementById("minusActividad").hidden = true;

    this.service.getActividades().subscribe((data) => {
      this.actividades = data;
    });
  }

  delete(actividad: Actividad) {
    this.service.deleteActividad(actividad).subscribe((data) => {
      this.actividades = this.actividades.filter((p) => p != actividad);
      alert("Actividad eliminado");
      window.location.reload();
    });
  }

  mostrarActividadAdd = false;
  habilitarActividad() {
    this.mostrarActividadAdd = true;
    document.getElementById("plusActividad").hidden = true;
    document.getElementById("minusActividad").hidden = false;
  }

  deshabilitarActividad() {
    this.mostrarActividadAdd = false;
    document.getElementById("plusActividad").hidden = false;
    document.getElementById("minusActividad").hidden = true;
  }

}
