import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Usuario } from "@modelsRest/Usuario";
import { TablaEjercicioServiceService } from "@servicesRest/tabla_ejercicio/tabla-ejercicio-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";

@Component({
  selector: "app-tabla-ejercicio-add",
  templateUrl: "./tabla-ejercicio-add.component.html",
  styleUrls: ["./tabla-ejercicio-add.component.css"],
})
export class TablaEjercicioAddComponent implements OnInit {
  nuevaTablaEjercicio: any;
  monitorId: number;
  suscriptorId: number;
  monitores: Usuario[];
  suscriptores: Usuario[];

  tablaAcivaSelect = "";
  slotMonitorSelect = "";
  suscriptorSelect = "";
  constructor(
    private _serviceUsuario: UsuarioServiceService,
    private _service: TablaEjercicioServiceService,
    private _router: Router
  ) {
    this.nuevaTablaEjercicio = {};
  }

  ngOnInit(): void {
    this._serviceUsuario.getUsuarios().subscribe((data) => {
      // esto se podria resumir en uno
      this.monitores = data;
      this.suscriptores = data;
    });
  }

  obtenerSuscriptor() {
    return this._serviceUsuario
      .getUsuario(this.suscriptorId)
      .toPromise()
      .then((data) => {
        this.nuevaTablaEjercicio.suscriptor = data;
      });
  }

  obtenerMonitor() {
    return this._serviceUsuario
      .getUsuario(this.monitorId)
      .toPromise()
      .then((data) => {
        this.nuevaTablaEjercicio.monitor = data;
      });
  }

  addTablaEjercicio() {
    this.obtenerSuscriptor()
    .then(()=>this.obtenerMonitor())
    .then(()=>{
      this._service.createTablaEjercicio(this.nuevaTablaEjercicio).subscribe(data=>{
        alert("Tabla creada");
        window.location.reload();
      })
    })
  }
}
