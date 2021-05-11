import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Sala } from "@modelsRest/Sala";
import { SalaServiceService } from "@servicesRest/sala/sala-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { HelperService } from "@core/services/helper.service";

@Component({
  selector: "app-sala-list",
  templateUrl: "./sala-list.component.html",
  styleUrls: ["./sala-list.component.css"],
})
export class SalaListComponent implements OnInit {
  //list
  mostrarSalaAdd: boolean = false;
  salas: Sala[];

  //update
  salaUpdate: any;
  closeResult = "";
  //confirm delete
  salaAux: any;

  constructor(
    private _service: SalaServiceService,
    private _router: Router,
    private modalService: NgbModal,
    private _helperService: HelperService
  ) {}

  ngOnInit(): void {
    this._helperService.isNotRol("user");
    document.getElementById("minus").hidden = true;
    this._service.getSalas().subscribe((data) => {
      this.salas = data;
    });
  }

  delete() {
    this._service.deleteSalas(this.salaAux).subscribe((data) => {
      window.location.reload();
    });
  }

  update() {
    this._service.updateSala(this.salaUpdate).subscribe((data) => {
      alert("Sala Actualizada!");
      this.modalService.dismissAll();
    });
    window.location.reload();
  }

  habilitarSala() {
    this.mostrarSalaAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }
  deshabilitarSala() {
    this.mostrarSalaAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

  open(content, sala: Sala) {
    this._service.getSala(sala.id).subscribe((data) => {
      this.salaUpdate = data;
    });
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  //modal coinfirm delete
  openModalDelete(confirmDelete, sala: Sala) {
    this.salaAux = sala;
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
