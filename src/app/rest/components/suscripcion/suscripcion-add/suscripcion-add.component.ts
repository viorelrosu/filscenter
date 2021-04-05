import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TipoSuscripcion } from "@modelsRest/TipoSuscripcion";
import { Usuario } from "@modelsRest/Usuario";
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
    private _router: Router
  ) {
    this.nuevaSuscripcion = {};
  }

  ngOnInit(): void {
    this._serviceTipoSuscripcion.getTiposSuscripcion().subscribe((data) => {
      this.tiposSuscripcion = data;
    });

    this._serviceUsuario.getUsuarios().subscribe((data) => {
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
  addSuscripcion() {
    this.obtenerTipoSuscripcion()
      .then(() => this.obtenerUsuario())
      .then(() => {
        this._service.createSuscripcion(this.nuevaSuscripcion).subscribe(
          (data) => {
            alert("Suscripción agregada");
            window.location.reload();
          },
          (err) => {
            alert("error");
          }
        );
      });
  }
}
