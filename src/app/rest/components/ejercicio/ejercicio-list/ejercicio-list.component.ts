import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Ejercicio } from "@modelsRest/Ejercicio";
import { EjercicioServiceService } from "@servicesRest/ejercicio/ejercicio-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { TipoEjercicio } from "@modelsRest/TipoEjercicio";
import { TipoEjercicioServiceService } from "@servicesRest/tipo_ejercicio/tipo-ejercicio-service.service";
import { HelperService } from "@core/services/helper.service";

@Component({
  selector: "app-ejercicio-list",
  templateUrl: "./ejercicio-list.component.html",
  styleUrls: ["./ejercicio-list.component.css"],
})
export class EjercicioListComponent implements OnInit {
  //mostrar ejercicio add
  mostrarEjercicioAdd: boolean = false;

  ejercicios: Ejercicio[];
  tiposEjercicio: TipoEjercicio[];

  //update
  ejercicioUpdate: any;
  textoModal: string;

  //confirm delete
  ejercicioAux: any;

  //filtros
  filterEjercicio: any;
  mainTablaEjercicios: Ejercicio[];
  filterTabla: Ejercicio[];

  constructor(
    private _service: EjercicioServiceService,
    private _serviceTipoEjercicio: TipoEjercicioServiceService,
    private _router: Router,
    private modalService: NgbModal,
    private _helperService: HelperService
  ) {
    this.ejercicioUpdate = {};
  }

  ngOnInit(): void {
    this._helperService.isNotRol("user");
    document.getElementById("minusEjercicio").hidden = true;

    this._service.getEjercicios().subscribe((data) => {
      this.ejercicios = data;
      this.mainTablaEjercicios = data;
    });

    this._serviceTipoEjercicio.getTipoEjercicios().subscribe((data) => {
      this.tiposEjercicio = data;
    });
  }

  delete() {
    this._service.deleteEjercicio(this.ejercicioAux).subscribe((data) => {
      window.location.reload();
    });
  }

  update(modal) {
    this._service.updateEjercicio(this.ejercicioUpdate).subscribe(
      (data) => {
        this.textoModal = "¡Ejercicio actualizado!";
        this.modalService.open(modal, {
          ariaLabelledBy: "modal-basic-title",
          centered: true,
          size: "md",
        });
      },
      (err) => {
        this.textoModal = "¡Error al actualizar!";
        this.modalService.open(modal, {
          ariaLabelledBy: "modal-basic-title",
          centered: true,
          size: "md",
        });
      }
    );
  }

  habilitarEjercicio() {
    this.mostrarEjercicioAdd = true;
    document.getElementById("plusEjercicio").hidden = true;
    document.getElementById("minusEjercicio").hidden = false;
  }

  deshabilitarEjercicio() {
    this.mostrarEjercicioAdd = false;
    document.getElementById("plusEjercicio").hidden = false;
    document.getElementById("minusEjercicio").hidden = true;
  }

  open(content, ejercicio: Ejercicio) {
    this._service.getEjercicio(ejercicio.id).subscribe((data) => {
      this.ejercicioUpdate = data;
    });
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  //modal coinfirm delete
  openModalDelete(confirmDelete, ejercicio: Ejercicio) {
    this.ejercicioAux = ejercicio;
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

  refresh() {
    window.location.reload();
  }

  filtrarTabla() {
    this.filterTabla = [];

    for (let ejercicio of this.mainTablaEjercicios) {
      if (
        ejercicio.nombre.toLowerCase() == this.filterEjercicio.toLowerCase() ||
        ejercicio.tipoEjercicio.nombre.toLowerCase() ==
          this.filterEjercicio.toLowerCase()
      ) {
        this.filterTabla.push(ejercicio);
      }
    }

    if (this.filterTabla.length > 0) {
      this.ejercicios = this.filterTabla;
    } else {
      this.ejercicios = this.mainTablaEjercicios;
    }
  }

  quitarFiltroTabla() {
    this.ejercicios = this.mainTablaEjercicios;
  }
}
