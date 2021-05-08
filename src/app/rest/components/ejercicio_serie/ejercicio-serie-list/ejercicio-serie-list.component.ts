import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EjercicioSerie } from "@modelsRest/EjercicioSerie";
import { EjercicioSerieServiceService } from "@servicesRest/ejercicio_serie/ejercicio-serie-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { TablaEjercicio } from "@modelsRest/TablaEjercicio";
import { Ejercicio } from "@modelsRest/Ejercicio";
import { EjercicioServiceService } from "@servicesRest/ejercicio/ejercicio-service.service";
import { TablaEjercicioServiceService } from "@servicesRest/tabla_ejercicio/tabla-ejercicio-service.service";

@Component({
  selector: "app-ejercicio-serie-list",
  templateUrl: "./ejercicio-serie-list.component.html",
  styleUrls: ["./ejercicio-serie-list.component.css"],
})
export class EjercicioSerieListComponent implements OnInit {
  //mostrar add
  mostrarEjercicioSerieAdd: boolean = false;

  //list
  ejercicioSeries: EjercicioSerie[];

  //update
  ejercicioSerieUpdate: any;
  tablasEjercicio: TablaEjercicio[];
  ejercicios: Ejercicio[];
  tablaId: number;
  ejercicioid: number;

  //confirm delete
  ejercicioSerieAux: any;

  private closeResult: string = "";
  constructor(
    private _service: EjercicioSerieServiceService,
    private _serviceEjercicio: EjercicioServiceService,
    private _serviceTablasEjercicio: TablaEjercicioServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.ejercicioSerieUpdate = {};
  }

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this._service.getEjercicioSeries().subscribe((data) => {
      this.ejercicioSeries = data;
    });

    this._serviceTablasEjercicio.getTablasEjercicios().subscribe((data) => {
      this.tablasEjercicio = data;
    });

    this._serviceEjercicio.getEjercicios().subscribe((data) => {
      this.ejercicios = data;
    });
  }

  delete() {
    this._service
      .deleteEjercicioSerie(this.ejercicioSerieAux)
      .subscribe((data) => {
        window.location.reload();
      });
  }
  update() {
    this._service
      .updateEjercicioSerie(this.ejercicioSerieUpdate)
      .subscribe((data) => {
        alert("Ejercicio Serie Actualizado!");
        this.modalService.dismissAll();
      });
    window.location.reload();
  }

  habilitarEjercicioSerie() {
    this.mostrarEjercicioSerieAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }

  deshabilitarEjercicioSerie() {
    this.mostrarEjercicioSerieAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

  open(content, ejercicioSerie: EjercicioSerie) {
    this._service.getEjercicioSerie(ejercicioSerie.id).subscribe((data) => {
      this.ejercicioSerieUpdate = data;
    });
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  //modal coinfirm delete
  openModalDelete(confirmDelete, ejercicioSerie: EjercicioSerie) {
    this.ejercicioSerieAux = ejercicioSerie;
    this.modalService
      .open(confirmDelete, {
        ariaLabelledBy: "modal-basic-title",
        centered: true,
        size: "md",
      })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
}
