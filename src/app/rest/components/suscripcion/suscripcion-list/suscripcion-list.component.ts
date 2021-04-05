import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Suscripcion } from "@modelsRest/Suscripcion";
import { SuscripcionServiceService } from "@servicesRest/suscripcion/suscripcion-service.service";

@Component({
  selector: "app-suscripcion-list",
  templateUrl: "./suscripcion-list.component.html",
  styleUrls: ["./suscripcion-list.component.css"],
})
export class SuscripcionListComponent implements OnInit {
  mostrarSuscripcionAdd: boolean = false;
  suscripciones: Suscripcion[];
  constructor(
    private service: SuscripcionServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.getElementById("minusSuscripcion").hidden = true;
    this.service.getSuscripciones().subscribe((data) => {
      this.suscripciones = data;
    });
  }

  delete(suscripcion: Suscripcion) {
    this.service.deleteSuscripcion(suscripcion).subscribe((data) => {
      this.suscripciones = this.suscripciones.filter((p) => p != suscripcion);
    });
  }

  habilitarSuscripcion() {
    this.mostrarSuscripcionAdd = true;
    document.getElementById("plusSuscripcion").hidden = true;
    document.getElementById("minusSuscripcion").hidden = false;
  }

  deshabilitarSuscripcion() {
    this.mostrarSuscripcionAdd = false;
    document.getElementById("plusSuscripcion").hidden = false;
    document.getElementById("minusSuscripcion").hidden = true;
  }
}
