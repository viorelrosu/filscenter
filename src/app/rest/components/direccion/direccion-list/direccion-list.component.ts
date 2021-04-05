import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Direccion } from "@modelsRest/Direccion";
import { DireccionServiceService } from "@servicesRest/direccion/direccion-service.service";

@Component({
  selector: "app-direccion-list",
  templateUrl: "./direccion-list.component.html",
  styleUrls: ["./direccion-list.component.css"],
})
export class DireccionListComponent implements OnInit {
  mostrarDireccionAdd:boolean=false;
  direcciones: Direccion[];

  constructor(
    private service: DireccionServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this.service.getDirecciones().subscribe((data) => {
      this.direcciones = data;
    });
  }

  delete(direccion: Direccion) {
    this.service.deleteDireccion(direccion).subscribe((data) => {
      this.direcciones = this.direcciones.filter((p) => p != direccion);
      alert("Dirección eliminado");
    });
  }

  habilitarDireccion(){
    this.mostrarDireccionAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }

  deshabilitarDireccion(){
    this.mostrarDireccionAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }
}
