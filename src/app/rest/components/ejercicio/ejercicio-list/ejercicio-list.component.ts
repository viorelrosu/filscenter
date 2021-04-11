import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Ejercicio } from "@modelsRest/Ejercicio";
import { EjercicioServiceService } from "@servicesRest/ejercicio/ejercicio-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { TipoEjercicio } from "@modelsRest/TipoEjercicio";
import { TipoEjercicioServiceService } from "@servicesRest/tipo_ejercicio/tipo-ejercicio-service.service";

@Component({
  selector: "app-ejercicio-list",
  templateUrl: "./ejercicio-list.component.html",
  styleUrls: ["./ejercicio-list.component.css"],
})
export class EjercicioListComponent implements OnInit {
  mostrarEjercicioAdd: boolean = false;

  ejercicios: Ejercicio[];

  tiposEjercicio: TipoEjercicio[];
  ejercicioUpdate: any;

  private closeResult: string = "";
  constructor(
    private _service: EjercicioServiceService,
    private _serviceTipoEjercicio: TipoEjercicioServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.ejercicioUpdate = {};
  }

  ngOnInit(): void {
    document.getElementById("minusEjercicio").hidden = true;

    this._service.getEjercicios().subscribe((data) => {
      this.ejercicios = data;
    });

    this._serviceTipoEjercicio.getTipoEjercicios().subscribe((data) => {
      this.tiposEjercicio = data;
    });
  }

  delete(ejercicio: Ejercicio) {
    this._service.deleteEjercicio(ejercicio).subscribe((data) => {
      this.ejercicios = this.ejercicios.filter((p) => p != ejercicio);
    });
  }

  update() {
    this._service.updateEjercicio(this.ejercicioUpdate).subscribe((data) => {
      alert("Ejercicio actualizado!");
      this.modalService.dismissAll();
    });
    window.location.reload();
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
