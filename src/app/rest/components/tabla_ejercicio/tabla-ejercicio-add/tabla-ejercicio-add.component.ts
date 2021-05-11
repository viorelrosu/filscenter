import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Usuario } from "@modelsRest/Usuario";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
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
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.nuevaTablaEjercicio = {};
  }

  ngOnInit(): void {
    this._serviceUsuario.getUsuariosByRol(3).subscribe(data=>{
      this.suscriptores=data;
    });
    this._serviceUsuario.getUsuariosByRol(2).subscribe(data=>{
      this.monitores=data;
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

  addTablaEjercicio(create,errorModal) {
    this.obtenerSuscriptor()
    .then(()=>this.obtenerMonitor())
    .then(()=>{
      this._service.createTablaEjercicio(this.nuevaTablaEjercicio).subscribe(data=>{
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