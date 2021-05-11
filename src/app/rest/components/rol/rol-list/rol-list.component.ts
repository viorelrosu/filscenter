import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Rol } from "@modelsRest/Rol";
import { RolServiceService } from "@servicesRest/rol/rol-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { HelperService } from '@core/services/helper.service';

@Component({
  selector: "app-rol-list",
  templateUrl: "./rol-list.component.html",
  styleUrls: ["./rol-list.component.css"],
})
export class RolListComponent implements OnInit {
  mostrarRolAdd: boolean = false;
  roles: Rol[];

  //update
  rolUpdate: any;
  closeResult = "";
  textoModal: string = "";

  //confirm delete
  rolAux:any;

  constructor(
    private _service: RolServiceService,
    private _router: Router,
    private modalService: NgbModal
    ,private _helperService: HelperService
  ) {
    this.rolUpdate = {};
    this.rolAux={};
  }

  ngOnInit(): void {
    this._helperService.isRolOK("admin");

    document.getElementById("minus").hidden = true;
    this._service.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  delete() {
    this._service.deleteRol(this.rolAux).subscribe((data) => {
      window.location.reload();
    });
  }

  update(modal) {
    this._service.updateRol(this.rolUpdate).subscribe(
      (data) => {
        this.textoModal = "¡Rol actualizado!";
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

  habilitarRol() {
    this.mostrarRolAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }
  deshabilitarRol() {
    this.mostrarRolAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

  open(content, rol: Rol) {
    this._service.getRol(rol.id).subscribe((data) => {
      this.rolUpdate = data;
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

  //abre modal confirm delete
  openModalDelete(confirmDelete, rol: Rol) {
    this.rolAux = rol;
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

  refresh(){
    window.location.reload();
  }
}
