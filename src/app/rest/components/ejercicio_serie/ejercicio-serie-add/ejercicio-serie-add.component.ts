import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Ejercicio } from "@modelsRest/Ejercicio";
import { TablaEjercicio } from "@modelsRest/TablaEjercicio";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EjercicioServiceService } from "@servicesRest/ejercicio/ejercicio-service.service";
import { EjercicioSerieServiceService } from "@servicesRest/ejercicio_serie/ejercicio-serie-service.service";
import { TablaEjercicioServiceService } from "@servicesRest/tabla_ejercicio/tabla-ejercicio-service.service";

@Component({
  selector: "app-ejercicio-serie-add",
  templateUrl: "./ejercicio-serie-add.component.html",
  styleUrls: ["./ejercicio-serie-add.component.css"],
})
export class EjercicioSerieAddComponent implements OnInit {
  nuevaSerieEjercicio: any;

  ejercicios: Ejercicio[];
  tablasEjercicio: TablaEjercicio[];

  ejercicioId: number;
  tablaId: number;

  ejerSelect = "";
  tablaSelect = "";
  constructor(
    private _serviceEjercicio: EjercicioServiceService,
    private _serviceTablaEjercicio: TablaEjercicioServiceService,
    private _service: EjercicioSerieServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.nuevaSerieEjercicio = {};
  }

  ngOnInit(): void {
    this._serviceEjercicio.getEjercicios().subscribe((data) => {
      this.ejercicios = data;
    });
    this._serviceTablaEjercicio.getTablasEjercicios().subscribe((data) => {
      this.tablasEjercicio = data;
    });
  }
  obtenerTabla() {
    return this._serviceTablaEjercicio
      .getTablaEjercicio(this.tablaId)
      .toPromise()
      .then((data) => {
        this.nuevaSerieEjercicio.tablaEjercicio = data;
      });
  }

  obtenerEjercicio() {
    return this._serviceEjercicio
      .getEjercicio(this.ejercicioId)
      .toPromise()
      .then((data) => {
        this.nuevaSerieEjercicio.ejercicio = data;
      });
  }
  addEjercicioSerie(create, errorModal) {
    this.obtenerTabla()
      .then(() => this.obtenerEjercicio())
      .then(() => {
        this._service.createEjercicioSerie(this.nuevaSerieEjercicio).subscribe(
          (data) => {
            this.modalService.open(create, {
              ariaLabelledBy: "modal-basic-title",
              centered: true,
              size: "md",
            });
            setTimeout(function () {
              window.location.reload();
            }, 3000);
          },
          (err) => {
            this.modalService.open(errorModal, {
              ariaLabelledBy: "modal-basic-title",
              centered: true,
              size: "md",
            });
          }
        );
      });
  }

  refresh() {
    window.location.reload();
  }
}
