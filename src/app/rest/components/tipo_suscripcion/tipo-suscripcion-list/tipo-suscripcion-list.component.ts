import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TipoSuscripcion } from "@modelsRest/TipoSuscripcion";
import { TipoSuscripcionServiceService } from "@servicesRest/tipo_suscripcion/tipo-suscripcion-service.service";

@Component({
  selector: "app-tipo-suscripcion-list",
  templateUrl: "./tipo-suscripcion-list.component.html",
  styleUrls: ["./tipo-suscripcion-list.component.css"],
})
export class TipoSuscripcionListComponent implements OnInit {
  mostrarTipoSuscripcionAdd:boolean=false;
  tiposSuscripcion: TipoSuscripcion[];

  constructor(
    private service: TipoSuscripcionServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this.service.getTiposSuscripcion().subscribe((data) => {
      this.tiposSuscripcion = data;
    });
  }

  delete(tipoSuscripcion: TipoSuscripcion) {
    this.service.deleteTipoSuscripcion(tipoSuscripcion).subscribe((data) => {
      this.tiposSuscripcion = this.tiposSuscripcion.filter(
        (p) => p != tipoSuscripcion
      );
    });
  }

  habilitarTipoSuscripcion(){
    this.mostrarTipoSuscripcionAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }

  deshabilitarTipoSuscripcion(){
    this.mostrarTipoSuscripcionAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }
}
