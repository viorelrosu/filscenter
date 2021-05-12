import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TipoSuscripcion } from "@modelsRest/TipoSuscripcion";
import { Usuario } from "@modelsRest/Usuario";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SuscripcionServiceService } from "@servicesRest/suscripcion/suscripcion-service.service";
import { TipoSuscripcionServiceService } from "@servicesRest/tipo_suscripcion/tipo-suscripcion-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";

@Component({
  selector: "app-suscripcion-add",
  templateUrl: "./suscripcion-add.component.html",
  styleUrls: ["./suscripcion-add.component.css"],
})
export class SuscripcionAddComponent implements OnInit {
  nuevaSuscripcion: any;
  tipoSuscripcionId: number;
  usuarioId: number;
  tipoSusSelect = "";
  usuarioSelect = "";
  tiposSuscripcion: TipoSuscripcion[];
  usuarios: Usuario[];

  constructor(
    private _service: SuscripcionServiceService,
    private _serviceTipoSuscripcion: TipoSuscripcionServiceService,
    private _serviceUsuario: UsuarioServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.nuevaSuscripcion = {};
  }

  ngOnInit(): void {
    this._serviceTipoSuscripcion.getTiposSuscripcion().subscribe((data) => {
      this.tiposSuscripcion = data;
    });

    this._serviceUsuario.getUsuariosByRol(3).subscribe((data) => {
      this.usuarios = data;
    });
  }
  obtenerTipoSuscripcion() {
    return this._serviceTipoSuscripcion
      .getTipoSuscripcion(this.tipoSuscripcionId)
      .toPromise()
      .then((data) => {
        this.nuevaSuscripcion.tipoSuscripcion = data;
      });
  }
  obtenerUsuario() {
    return this._serviceUsuario
      .getUsuario(this.usuarioId)
      .toPromise()
      .then((data) => {
        this.nuevaSuscripcion.usuario = data;
      });
  }
  addSuscripcion(create, errorModal) {
    this.obtenerTipoSuscripcion()
      .then(() => this.obtenerUsuario())
      .then(() => {
        this._service.createSuscripcion(this.nuevaSuscripcion).subscribe(
          (data) => {
            this.modalService.open(create, {
              ariaLabelledBy: "modal-basic-title",
              centered: true,
              size: "md",
            });
            setTimeout(function () {
              window.location.reload();
            }, 3000);
          },
          (err) => {
            this.modalService.open(errorModal, {
              ariaLabelledBy: "modal-basic-title",
              centered: true,
              size: "md",
            });
          }
        );
      });
  }
  
  refresh() {
    window.location.reload();
  }
}
