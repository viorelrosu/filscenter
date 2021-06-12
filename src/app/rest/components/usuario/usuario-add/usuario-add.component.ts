import { Component, OnInit } from "@angular/core";
import { Localidad } from "@modelsRest/Localidad";
import { Provincia } from "@modelsRest/Provincia";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LocalidadServiceService } from "@servicesRest/localidad/localidad-service.service";
import { ProvinciaServiceService } from "@servicesRest/provincia/provincia-service.service";
import { RolServiceService } from "@servicesRest/rol/rol-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";

import { md5 } from "pure-md5";

@Component({
  selector: "app-usuario-add",
  templateUrl: "./usuario-add.component.html",
  styleUrls: ["./usuario-add.component.css"],
})
export class UsuarioAddComponent implements OnInit {
  //establecer beans a crear
  nuevoUsuario: any;
  direccion: any;
  confirmPass: string = "";

  //cargar selects
  localidades: Localidad[];
  provincias: Provincia[];

  rolId: number = 1;

  localidadId: number;
  provinciaId: number = 0;

  //establecer value selects
  localidadSelect = "";
  provinciaSelect = "";
  rolSelect = "";

  constructor(
    private _service: UsuarioServiceService,
    private _serviceLocalidad: LocalidadServiceService,
    private _serviceProvincia: ProvinciaServiceService,
    private _serviceRol: RolServiceService,
    private modalService: NgbModal
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
    this._serviceLocalidad
      .getLocalidadesByProvinciaID(provinciaId)
      .subscribe((data) => {
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
  addUsuario(create, errorModalUser) {
    this.obtenerLocalidad()
      .then(() => this.obtenerRol())
      .then(() => {
        this.nuevoUsuario.email = this.nuevoUsuario.email.toLowerCase();
        this.nuevoUsuario.password = md5(this.nuevoUsuario.password);
        this.nuevoUsuario.direccion = this.direccion;
        this._service.altaUser(this.nuevoUsuario).subscribe(
          (data) => {
            this.modalService.open(create, {
              ariaLabelledBy: "modal-basic-title",
              centered: true,
              size: "md",
            });
            setTimeout(function () {
              window.location.reload(), console.log("funciona");
            }, 3000);
          },
          (err) => {
            this.modalService.open(errorModalUser, {
              ariaLabelledBy: "modal-basic-title",
              centered: true,
              size: "md",
            });
            this.nuevoUsuario.password = "";
            this.confirmPass = "";
          }
        );
      });
  }

  refresh() {
    window.location.reload();
  }
}
