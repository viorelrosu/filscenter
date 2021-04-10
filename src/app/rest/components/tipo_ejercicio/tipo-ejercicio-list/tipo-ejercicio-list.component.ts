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
  mostrarTipoEjercicioAdd: boolean = false;
  private closeResult: string = "";

  tiposEjercicio: TipoEjercicio[];
  tipoEjercicioUpdate: any;
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
  update() {
    this._service
      .updateTipoEjercicio(this.tipoEjercicioUpdate)
      .subscribe((data) => {
        alert("Tipo ejercicio actualizado !");
        this.modalService.dismissAll();
      });
    window.location.reload();
  }
  delete(tipoEjercicio: TipoEjercicio) {
    this._service.deleteTipoEjercicio(tipoEjercicio).subscribe((data) => {
      this.tiposEjercicio = this.tiposEjercicio.filter(
        (p) => p != tipoEjercicio
      );
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
