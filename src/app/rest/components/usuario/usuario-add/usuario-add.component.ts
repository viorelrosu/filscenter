import { Component, OnInit } from "@angular/core";
import { Direccion } from "@modelsRest/Direccion";
import { Suscripcion } from "@modelsRest/Suscripcion";
import { Taquilla } from "@modelsRest/Taquilla";
import { DireccionServiceService } from "@servicesRest/direccion/direccion-service.service";
import { RolServiceService } from "@servicesRest/rol/rol-service.service";
import { SuscripcionServiceService } from "@servicesRest/suscripcion/suscripcion-service.service";
import { TaquillaServiceService } from "@servicesRest/taquilla/taquilla-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";

@Component({
  selector: "app-usuario-add",
  templateUrl: "./usuario-add.component.html",
  styleUrls: ["./usuario-add.component.css"],
})
export class UsuarioAddComponent implements OnInit {
  nuevoUsuario: any;

  DireccionId: number;
  direcciones: Direccion[];
  suscripcionId: number;
  suscripciones: Suscripcion[];
  TaquillaId: number;
  taquillas: Taquilla[];
  rolId: number = 1;

  direccionSelect = "";
  suscripcionSelect = "";
  taquillaSelect = "";

  constructor(
    private _service: UsuarioServiceService,
    private _serviceDireccion: DireccionServiceService,
    private _serviceRol: RolServiceService,
    private _serviceTaquilla: TaquillaServiceService,
    private _serviceSuscripcion: SuscripcionServiceService
  ) {
    this.nuevoUsuario = {};
  }

  ngOnInit(): void {
    this._serviceDireccion.getDirecciones().subscribe((data) => {
      this.direcciones = data;
    });

    this._serviceSuscripcion.getSuscripciones().subscribe((data) => {
      this.suscripciones = data;
    });

    this._serviceTaquilla.getTaquillas().subscribe((data) => {
      this.taquillas = data;
    });
  }

  obtenerDireccion() {
    return this._serviceDireccion
      .getDireccion(this.DireccionId)
      .toPromise()
      .then((data) => {
        this.nuevoUsuario.direccion = data;
      });
  }

  obtenerTaquilla() {
    return this._serviceTaquilla
      .getTaquilla(this.TaquillaId)
      .toPromise()
      .then((data) => {
        this.nuevoUsuario.taquilla = data;
      });
  }

  obtenerSuscripcion() {
    return this._serviceSuscripcion
      .getSuscripcion(this.suscripcionId)
      .toPromise()
      .then((data) => {
        this.nuevoUsuario.suscripcion = data;
      });
  }

  obtenerRol() {
    return this._serviceRol
      .getRol(this.rolId)
      .toPromise()
      .then((data) => {
        this.nuevoUsuario.rol = data;
      });
  }
  addUsuario() {
    this.obtenerDireccion()
      .then(() => this.obtenerSuscripcion())
      .then(() => this.obtenerTaquilla())
      .then(() => this.obtenerRol())
      .then(() => {
        this._service.createUsuario(this.nuevoUsuario).subscribe(
          (data) => {
            alert("Usuario creado");
            window.location.reload();
          },
          (err) => {
            alert(err);
          }
        );
      });
  }
}
