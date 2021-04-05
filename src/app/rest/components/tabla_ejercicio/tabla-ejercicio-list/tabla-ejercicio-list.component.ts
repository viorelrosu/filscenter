import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TablaEjercicio } from "@modelsRest/TablaEjercicio";
import { TablaEjercicioServiceService } from "@servicesRest/tabla_ejercicio/tabla-ejercicio-service.service";

@Component({
  selector: "app-tabla-ejercicio-list",
  templateUrl: "./tabla-ejercicio-list.component.html",
  styleUrls: ["./tabla-ejercicio-list.component.css"],
})
export class TablaEjercicioListComponent implements OnInit {
  tablasEjercicio: TablaEjercicio[];

  constructor(
    private service: TablaEjercicioServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getTablasEjercicios().subscribe((data) => {
      this.tablasEjercicio = data;
    });
  }

  delete(tablaEjercicio: TablaEjercicio) {
    this.service.deleteTablaEjercicio(tablaEjercicio).subscribe((data) => {
      this.tablasEjercicio = this.tablasEjercicio.filter(
        (p) => p != tablaEjercicio
      );
    });
  }
}
