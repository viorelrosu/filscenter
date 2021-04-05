import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TipoEjercicio } from "@modelsRest/TipoEjercicio";
import { TipoEjercicioServiceService } from "@servicesRest/tipo_ejercicio/tipo-ejercicio-service.service";

@Component({
  selector: "app-tipo-ejercicio-list",
  templateUrl: "./tipo-ejercicio-list.component.html",
  styleUrls: ["./tipo-ejercicio-list.component.css"],
})
export class TipoEjercicioListComponent implements OnInit {
  mostrarTipoEjercicioAdd : boolean = false;

  tiposEjercicio: TipoEjercicio[];
  constructor(
    private service: TipoEjercicioServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;

    this.service.getTipoEjercicios().subscribe((data) => {
      this.tiposEjercicio = data;
    });
  }

  delete(tipoEjercicio: TipoEjercicio) {
    this.service.deleteTipoEjercicio(tipoEjercicio).subscribe((data) => {
      this.tiposEjercicio = this.tiposEjercicio.filter(
        (p) => p != tipoEjercicio
      );
    });
    
  }



  habilitarTipoEjercicio(){
    this.mostrarTipoEjercicioAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }

  deshabilitarTipoEjercicio(){
    this.mostrarTipoEjercicioAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }
}
