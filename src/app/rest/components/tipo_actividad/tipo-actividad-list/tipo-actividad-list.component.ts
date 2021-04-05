import { Component, OnInit, DoCheck } from "@angular/core";
import { Router } from "@angular/router";
import { TipoActividad } from "@modelsRest/TipoActividad";
import { TipoActividadServiceService } from "../../../services/tipo_actividad/tipo-actividad-service.service";

@Component({
  selector: "app-tipo-actividad-list",
  templateUrl: "./tipo-actividad-list.component.html",
  styleUrls: ["./tipo-actividad-list.component.css"],
})
export class TipoActividadListComponent implements OnInit {
  mostrarTipoActividadAdd: boolean = false;

  tipoActividades: TipoActividad[];

  constructor(
    private service: TipoActividadServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;

    this.service.getTipoActividades().subscribe((data) => {
      this.tipoActividades = data;
    });
  }

  DoCheck(): void {
    this.service.getTipoActividades().subscribe((data) => {
      this.tipoActividades = data;
    });
  }

  delete(tipoActividad: TipoActividad) {
    this.service.deleteTipoActividad(tipoActividad).subscribe((data) => {
      this.tipoActividades = this.tipoActividades.filter(
        (p) => p != tipoActividad
      );
      window.location.reload();
      alert("Tipo de Actividad eliminado");
    });
  }

  habilitarTipoActividad() {
    this.mostrarTipoActividadAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }

  deshabilitarTipoActividad() {
    this.mostrarTipoActividadAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }
}
