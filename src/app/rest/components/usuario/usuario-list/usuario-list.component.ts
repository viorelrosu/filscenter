import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Direccion } from "@modelsRest/Direccion";
import { Suscripcion } from "@modelsRest/Suscripcion";
import { Taquilla } from "@modelsRest/Taquilla";
import { Usuario } from "@modelsRest/Usuario";
import { DireccionServiceService } from "@servicesRest/direccion/direccion-service.service";
import { SuscripcionServiceService } from "@servicesRest/suscripcion/suscripcion-service.service";
import { TaquillaServiceService } from "@servicesRest/taquilla/taquilla-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-usuario-list",
  templateUrl: "./usuario-list.component.html",
  styleUrls: ["./usuario-list.component.css"],
})
export class UsuarioListComponent implements OnInit {
  mostrarUsuarioAdd: boolean = false;

  usuarios: Usuario[];

  //UPDATE

  usuarioUpdate: any;
  suscripciones: Suscripcion[];
  direcciones: Direccion[];
  taquillas: Taquilla[];
  closeResult = "";

  constructor(
    private _service: UsuarioServiceService,
    private _serviceTaquilla: TaquillaServiceService,
    private _serviceDireccion: DireccionServiceService,
    private _serviceSuscripcion: SuscripcionServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.usuarioUpdate={};
  }

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this._service.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });

    this._serviceDireccion.getDirecciones().subscribe(data=>{
      this.direcciones = data;
    });

    this._serviceSuscripcion.getSuscripciones().subscribe(data=>{
      this.suscripciones=data;
    });

    this._serviceTaquilla.getTaquillas().subscribe(data=>{
      this.taquillas=data;
    });
  }

  delete(usuario: Usuario) {
    this._service.deleteUsuario(usuario).subscribe((data) => {
      this.usuarios = this.usuarios.filter((p) => p != usuario);
    });
  }

  update(){
    this._service.updateUsuario(this.usuarioUpdate).subscribe(data=>{
      alert("Actividad Actualizada!");
      this.modalService.dismissAll();
    });
    window.location.reload();
  }

  habilitarUsuario() {
    this.mostrarUsuarioAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }
  deshabilitarUsuario() {
    this.mostrarUsuarioAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

  open(content, usuario:Usuario) {
    this._service.getUsuario(usuario.id).subscribe((data) => {
      this.usuarioUpdate = data;
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
