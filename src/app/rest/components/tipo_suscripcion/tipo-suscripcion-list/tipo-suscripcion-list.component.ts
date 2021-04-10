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

  delete(tipoSuscripcion: TipoSuscripcion) {
    this._service.deleteTipoSuscripcion(tipoSuscripcion).subscribe((data) => {
      this.tiposSuscripcion = this.tiposSuscripcion.filter(
        (p) => p != tipoSuscripcion
      );
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

  update() {
    this._service
      .updateTipoSuscripcion(this.tipoSuscripcionUpdate)
      .subscribe((data) => {
        alert("Tipo suscripcion actualizado");
        this.modalService.dismissAll();
      }),
      window.location.reload();
  }

  open(content, tipoSuscripcion: TipoSuscripcion) {
    this._service.getTipoSuscripcion(tipoSuscripcion.id).subscribe((data) => {
      this.tipoSuscripcionUpdate = data;
    });
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
