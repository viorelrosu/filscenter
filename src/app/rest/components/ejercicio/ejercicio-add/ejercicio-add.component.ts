import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TipoEjercicio } from "@modelsRest/TipoEjercicio";
import { EjercicioServiceService } from "@servicesRest/ejercicio/ejercicio-service.service";
import { TipoEjercicioServiceService } from "@servicesRest/tipo_ejercicio/tipo-ejercicio-service.service";

@Component({
  selector: "app-ejercicio-add",
  templateUrl: "./ejercicio-add.component.html",
  styleUrls: ["./ejercicio-add.component.css"],
})
export class EjercicioAddComponent implements OnInit {
  nuevoEjercicio: any;
  tipoEjercicioId: number;
  tipoEjerSelect = "";
  tiposEjercicio: TipoEjercicio[];
  constructor(
    private _service: EjercicioServiceService,
    private _serviceTipoEjercicio: TipoEjercicioServiceService,
    private _router: Router
  ) {
    this.nuevoEjercicio = {
      nombre: "",
      tipoEjercicio: {
        nombre: "",
      },
    };
  }

  ngOnInit(): void {
    this._serviceTipoEjercicio.getTipoEjercicios().subscribe((data) => {
      this.tiposEjercicio = data;
    });
  }

  obtenerUnTipoEjercicio() {
    return this._serviceTipoEjercicio
      .getTipoEjercicio(this.tipoEjercicioId)
      .toPromise()
      .then((data) => {
        this.nuevoEjercicio.tipoEjercicio = data;
      });
  }

  addEjercicio() {
    this.obtenerUnTipoEjercicio().then(() => {
      this._service.createEjercicio(this.nuevoEjercicio).subscribe(
        (data) => {
          alert("Ejercicio agregado");
          window.location.reload();
        },
        (err) => {
          alert("error");
        }
      );
    });
  }
}
