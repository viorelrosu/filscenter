import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TipoEjercicio } from "@modelsRest/TipoEjercicio";
import { TipoEjercicioServiceService } from "@servicesRest/tipo_ejercicio/tipo-ejercicio-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-tipo-ejercicio-list",
  templateUrl: "./tipo-ejercicio-list.component.html",
  styleUrls: ["./tipo-ejercicio-list.component.css"],
})
export class TipoEjercicioListComponent implements OnInit {
  //open parte add
  mostrarTipoEjercicioAdd: boolean = false;

  //parte update
  tiposEjercicio: TipoEjercicio[];
  tipoEjercicioUpdate: any;
  textoModal: string;

  //confirm delete
  tipoEjercicioAux:any;

  constructor(
    private _service: TipoEjercicioServiceService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.tipoEjercicioUpdate = {};
  }

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;

    this._service.getTipoEjercicios().subscribe((data) => {
      this.tiposEjercicio = data;
    });
  }
  update(modal) {
    this._service
      .updateTipoEjercicio(this.tipoEjercicioUpdate)
      .subscribe((data) => {
        this.textoModal = "¡Tipo ejercicio actualizado!";
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
  delete() {
    this._service.deleteTipoEjercicio(this.tipoEjercicioAux).subscribe((data) => {
      window.location.reload();
    });
  }

  habilitarTipoEjercicio() {
    this.mostrarTipoEjercicioAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }

  deshabilitarTipoEjercicio() {
    this.mostrarTipoEjercicioAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

  open(content, tipoEjercicio: TipoEjercicio) {
    this._service.getTipoEjercicio(tipoEjercicio.id).subscribe((data) => {
      this.tipoEjercicioUpdate = data;
    });
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
        },
        (reason) => {
        }
      );
  }

      //modal coinfirm delete
      openModalDelete(confirmDelete, tipoEjercicio:TipoEjercicio){
        this.tipoEjercicioAux = tipoEjercicio;
        this.modalService
        .open(confirmDelete, { ariaLabelledBy: "modal-basic-title", centered: true, size : "md"})
        .result.then(
          (result) => {
          },
          (reason) => {
          }
        );
      }
      refresh() {
        window.location.reload();
      }
    
}
