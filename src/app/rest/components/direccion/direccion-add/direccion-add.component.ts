import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Localidad } from "@modelsRest/Localidad";
import { Usuario } from "@modelsRest/Usuario";
import { DireccionServiceService } from "@servicesRest/direccion/direccion-service.service";
import { LocalidadServiceService } from "@servicesRest/localidad/localidad-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";
import { Direccion } from "@shared/models/direccion";

@Component({
  selector: "app-direccion-add",
  templateUrl: "./direccion-add.component.html",
  styleUrls: ["./direccion-add.component.css"],
})
export class DireccionAddComponent implements OnInit {

  nuevaDireccion: any;

  localidadId: number;
  usuarioId: number;

  localidadSelect = "";
  usuarioSelect = "";

  localidades: Localidad[];
  usuarios: Usuario[];

  constructor(
    private _service: DireccionServiceService,
    private _serviceLocalidad: LocalidadServiceService,
    private _serviceUsuario: UsuarioServiceService,
    private _router: Router
  ) {
    this.nuevaDireccion = {
    };
  }

  ngOnInit(): void {
    this._serviceLocalidad.getLocalidades().subscribe((data) => {
      this.localidades = data;
    });
    this._serviceUsuario.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  obtenerUsuario() {
    return this._serviceUsuario
      .getUsuario(this.usuarioId)
      .toPromise()
      .then((data) => {
        this.nuevaDireccion.usuario = data;
        console.log(this.nuevaDireccion.usuario);
        
      });
  }

  obtenerLocalidad() {
    return this._serviceLocalidad
      .getLocalidad(this.localidadId)
      .toPromise()
      .then((data) => {
        this.nuevaDireccion.localidad = data;
      });
  }

  addDireccion() {
    this.obtenerLocalidad()
      .then(() => this.obtenerUsuario())
      .then(() => {

        console.log(JSON.stringify(this.nuevaDireccion));
  
        /*this._service.createDireccion(this.nuevaDireccion).subscribe(
          (data) => {
            alert("Dirección agregada");
            window.location.reload();
          },
          (err) => {
            alert("error");
            console.log(err);
            
          }
        );*/
      });
  }
}
