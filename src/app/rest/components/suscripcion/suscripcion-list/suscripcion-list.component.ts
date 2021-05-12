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
  textoModal:string;

  //confirm delete
  suscripcionAux: any;

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

    this._serviceUsuario.getUsuariosByRol(3).subscribe((data) => {
      this.usuarios = data;
    });
  }

  delete() {
    this._service.deleteSuscripcion(this.suscripcionAux).subscribe((data) => {
      window.location.reload();
    });
  }

  update(modal) {
    this._service
      .updateSuscripcion(this.suscripcionUpdate)
      .subscribe((data) => {
        this.textoModal = "¡Suscripción actualizada!";
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
    console.log(suscripcion);
    
    this._service.getSuscripcion(suscripcion.id).subscribe((data) => {
      this.suscripcionUpdate = data;
      console.log(data);
      
    });
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  //abre modal confirm delete
  openModalDelete(confirmDelete, suscripcion: Suscripcion) {
    this.suscripcionAux = suscripcion;
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
