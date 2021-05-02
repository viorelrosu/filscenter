import { Component, OnInit } from "@angular/core";
import { Direccion } from "@modelsRest/Direccion";
import { Localidad } from "@modelsRest/Localidad";
import { Provincia } from "@modelsRest/Provincia";
import { Suscripcion } from "@modelsRest/Suscripcion";
import { Taquilla } from "@modelsRest/Taquilla";
import { DireccionServiceService } from "@servicesRest/direccion/direccion-service.service";
import { LocalidadServiceService } from "@servicesRest/localidad/localidad-service.service";
import { ProvinciaServiceService } from "@servicesRest/provincia/provincia-service.service";
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
  direccion: any;

  localidades: Localidad[];
  provincias: Provincia[];

  rolId: number = 1;
  localidadId: number;
  provinciaId: number = 0;

  localidadSelect = "";
  provinciaSelect = "";

  constructor(
    private _service: UsuarioServiceService,
    private _serviceLocalidad: LocalidadServiceService,
    private _serviceProvincia: ProvinciaServiceService,
    private _serviceRol: RolServiceService
  ) {
    this.nuevoUsuario = {};
    this.direccion = {};
  }

  ngOnInit(): void {
    this._serviceProvincia.getProvincias().subscribe((data) => {
      this.provincias = data;
    });
  }

  // metodo para cargar los localidades de la provincia
  cargarLocalidades(provinciaId) {
    this.localidadSelect = "";
    this._serviceLocalidad.getLocalidadesByProvinciaID(provinciaId).subscribe((data) => {
      this.localidades = data;
    }); 
  }

  // metodo para obtener y enlazar la localidad con la direccion que se va a crear
  obtenerLocalidad() {
    return this._serviceLocalidad
      .getLocalidad(this.localidadId)
      .toPromise()
      .then((data) => {
        this.direccion.localidad = data;
      });
  }

  //metodo para obtener y enlazar el rol (por default será el de ROLE_USER)
  obtenerRol() {
    return this._serviceRol
      .getRol(this.rolId)
      .toPromise()
      .then((data) => {
        this.nuevoUsuario.rol = data;
      });
  }

  //metodo para crear al usuario
  addUsuario() {
    this.obtenerLocalidad()
      .then(() => this.obtenerRol())
      .then(() => {
        this.nuevoUsuario.direccion = this.direccion;
        this._service.altaUser(this.nuevoUsuario).subscribe(
          (data) => {
            alert("usuario registrado");
            window.location.reload();
          },
          (err) => {
            alert(err);
          }
        );
      });
  }
}
