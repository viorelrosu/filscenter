import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Suscripcion } from "@modelsRest/Suscripcion";
import { SuscripcionServiceService } from "@servicesRest/suscripcion/suscripcion-service.service";
import { TipoSuscripcionServiceService } from "@servicesRest/tipo_suscripcion/tipo-suscripcion-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { TipoSuscripcion } from "@modelsRest/TipoSuscripcion";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";
import { Usuario } from "@modelsRest/Usuario";
import { HelperService } from "@core/services/helper.service";

@Component({
  selector: "app-suscripcion-list",
  templateUrl: "./suscripcion-list.component.html",
  styleUrls: ["./suscripcion-list.component.css"],
})
export class SuscripcionListComponent implements OnInit {
  mostrarSuscripcionAdd: boolean = false;
  suscripciones: Suscripcion[];

  //update
  suscripcionUpdate: any;
  tiposSuscripcion: TipoSuscripcion[];
  usuarios: Usuario[];
  closeResult = "";

  constructor(
    private _service: SuscripcionServiceService,
    private _serviceTipoSuscripcion: TipoSuscripcionServiceService,
    private _serviceUsuario: UsuarioServiceService,
    private _router: Router,
    private modalService: NgbModal,
    private _helperService: HelperService
  ) {}

  ngOnInit(): void {
    this._helperService.isRolOK("admin");
    document.getElementById("minusSuscripcion").hidden = true;
    this._service.getSuscripciones().subscribe((data) => {
      this.suscripciones = data;
    });

    this._serviceTipoSuscripcion.getTiposSuscripcion().subscribe((data) => {
      this.tiposSuscripcion = data;
    });

    this._serviceUsuario.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  delete(suscripcion: Suscripcion) {
    this._service.deleteSuscripcion(suscripcion).subscribe((data) => {
      this.suscripciones = this.suscripciones.filter((p) => p != suscripcion);
    });
  }

  update() {
    this._service
      .updateSuscripcion(this.suscripcionUpdate)
      .subscribe((data) => {
        alert("Suscripción Actualizada!");
        this.modalService.dismissAll();
      });
    window.location.reload();
  }

  habilitarSuscripcion() {
    this.mostrarSuscripcionAdd = true;
    document.getElementById("plusSuscripcion").hidden = true;
    document.getElementById("minusSuscripcion").hidden = false;
  }

  deshabilitarSuscripcion() {
    this.mostrarSuscripcionAdd = false;
    document.getElementById("plusSuscripcion").hidden = false;
    document.getElementById("minusSuscripcion").hidden = true;
  }

  open(content, suscripcion: Suscripcion) {
    this._service.getSuscripcion(suscripcion.id).subscribe((data) => {
      this.suscripcionUpdate = data;
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
