import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Rol } from "@modelsRest/Rol";
import { RolServiceService } from "@servicesRest/rol/rol-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

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

  constructor(
    private _service: RolServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.rolUpdate = {};
  }

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this._service.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  delete(rol: Rol) {
    this._service.deleteRol(rol).subscribe((data) => {
      this.roles = this.roles.filter((p) => p != rol);
    });
  }

  update() {
    this._service.updateRol(this.rolUpdate).subscribe((dara) => {
      alert("Rol Actualizado!");
      this.modalService.dismissAll();
    });
    window.location.reload();
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
