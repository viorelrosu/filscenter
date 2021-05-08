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
  //mostrar ejercicio add
  mostrarEjercicioAdd: boolean = false;

  ejercicios: Ejercicio[];
  tiposEjercicio: TipoEjercicio[];

  //update
  ejercicioUpdate: any;

  //confirm delete
  ejercicioAux:any;

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

  delete() {
    this._service.deleteEjercicio(this.ejercicioAux).subscribe((data) => {
      window.location.reload();
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
          
        },
        (reason) => {
         
        }
      );
  }

    //modal coinfirm delete
    openModalDelete(confirmDelete, ejercicio:Ejercicio){
      this.ejercicioAux = ejercicio;
      this.modalService
      .open(confirmDelete, { ariaLabelledBy: "modal-basic-title", centered: true, size : "md"})
      .result.then(
        (result) => {
        },
        (reason) => {
        }
      );
    }

}
