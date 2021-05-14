import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TipoSuscripcion } from "@modelsRest/TipoSuscripcion";
import { Usuario } from "@modelsRest/Usuario";
import { SuscripcionServiceService } from "@servicesRest/suscripcion/suscripcion-service.service";
import { TipoSuscripcionServiceService } from "@servicesRest/tipo_suscripcion/tipo-suscripcion-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";
import { HelperService } from "@core/services/helper.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Suscripcion } from "@modelsRest/suscripcion";

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
  textoModal: string;

  //confirm delete
  suscripcionAux: any;

  //filters
  filterName: string;
  mainTablaSuscripciones: Suscripcion[];
  filterTabla: Suscripcion[];

  constructor(
    private _service: SuscripcionServiceService,
    private _serviceTipoSuscripcion: TipoSuscripcionServiceService,
    private _serviceUsuario: UsuarioServiceService,
    private _router: Router,
    private modalService: NgbModal,
    private _helperService: HelperService
  ) {
    this.suscripcionUpdate = {};
  }

  ngOnInit(): void {
    this._helperService.isRolOK("admin");
    document.getElementById("minusSuscripcion").hidden = true;
    this._service.getSuscripciones().subscribe((data) => {
      this.suscripciones = data;
      this.mainTablaSuscripciones = data;
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
    this._service.updateSuscripcion(this.suscripcionUpdate).subscribe(
      (data) => {
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

  filtrarTabla() {
    this.filterTabla = [];
    //console.log(this.mainTablaSuscripciones);

    for (let suscripcion of this.mainTablaSuscripciones) {
      //console.log(suscripcion.usuario.nombre);

      if (
        suscripcion.usuario.nombre.toLocaleLowerCase() ==
        this.filterName.toLocaleLowerCase()
      ) {
        //console.log(suscripcion);
        this.filterTabla.push(suscripcion);
      }
    }
    console.log(this.filterTabla);

    if (this.filterTabla.length > 0) {
      this.suscripciones = this.filterTabla;
    } else {
      this.suscripciones = this.mainTablaSuscripciones;
    }
  }

  quitarFiltroTabla() {
    this.suscripciones = this.mainTablaSuscripciones;
  }
}
