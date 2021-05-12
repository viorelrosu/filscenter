import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TipoSuscripcion } from "@modelsRest/TipoSuscripcion";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { TipoSuscripcionServiceService } from "@servicesRest/tipo_suscripcion/tipo-suscripcion-service.service";

@Component({
  selector: "app-tipo-suscripcion-list",
  templateUrl: "./tipo-suscripcion-list.component.html",
  styleUrls: ["./tipo-suscripcion-list.component.css"],
})
export class TipoSuscripcionListComponent implements OnInit {
  mostrarTipoSuscripcionAdd: boolean = false;
  closeResult = "";
  textoModal: string;

  //confirm delete
  tipoSuscripcionAux: any;

  tiposSuscripcion: TipoSuscripcion[];
  tipoSuscripcionUpdate: any;

  constructor(
    private _service: TipoSuscripcionServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.tipoSuscripcionUpdate = {};
  }

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this._service.getTiposSuscripcion().subscribe((data) => {
      this.tiposSuscripcion = data;
    });
  }

  delete() {
    this._service
      .deleteTipoSuscripcion(this.tipoSuscripcionAux)
      .subscribe((data) => {
        window.location.reload();
      });
  }

  habilitarTipoSuscripcion() {
    this.mostrarTipoSuscripcionAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }

  deshabilitarTipoSuscripcion() {
    this.mostrarTipoSuscripcionAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

  update(modal) {
    this._service
      .updateTipoSuscripcion(this.tipoSuscripcionUpdate)
      .subscribe((data) => {
        this.textoModal = "¡Tipo Suscripción actualizada!";
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


  open(content, tipoSuscripcion: TipoSuscripcion) {
    this._service.getTipoSuscripcion(tipoSuscripcion.id).subscribe((data) => {
      this.tipoSuscripcionUpdate = data;
    });
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  //abre modal confirm delete
  openModalDelete(confirmDelete, tipoSuscripcion: TipoSuscripcion) {
    this.tipoSuscripcionAux = tipoSuscripcion;
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
}
