import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Actividad } from "@modelsRest/Actividad";
import { Sala } from "@modelsRest/Sala";
import { Usuario } from "@modelsRest/Usuario";
import { ActividadServiceService } from "@servicesRest/actividad/actividad-service.service";
import { SalaServiceService } from "@servicesRest/sala/sala-service.service";
import { SlotServiceService } from "@servicesRest/slot/slot-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";

@Component({
  selector: "app-slot-add",
  templateUrl: "./slot-add.component.html",
  styleUrls: ["./slot-add.component.css"],
})
export class SlotAddComponent implements OnInit {
  nuevoSlot: any;

  actividadId: number;
  salaId: number;
  monitorId: number;

  slotActividadSelect = "";
  slotSalaSelect = "";
  slotMonitorSelect = "";

  monitores: Usuario[];
  salas: Sala[];
  actividades: Actividad[];

  constructor(
    private _service: SlotServiceService,
    private _serviceSala: SalaServiceService,
    private _serviceUsuario: UsuarioServiceService,
    private _serviceActividad: ActividadServiceService,
    private _router: Router
  ) {
    this.nuevoSlot = {};
  }

  ngOnInit(): void {
    this._serviceUsuario.getUsuarios().subscribe((data) => {
      this.monitores = data;
    });

    this._serviceSala.getSalas().subscribe((data) => {
      this.salas = data;
    });

    this._serviceActividad.getActividades().subscribe((data) => {
      this.actividades = data;
    });
  }

  obtenerUsuario() {
    return this._serviceUsuario
      .getUsuario(this.monitorId)
      .toPromise()
      .then((data) => {
        this.nuevoSlot.monitor = data;
      });
  }

  obtenerActividad() {
    return this._serviceActividad
      .getActividad(this.actividadId)
      .toPromise()
      .then((data) => {
        this.nuevoSlot.actividad = data;
      });
  }

  obtenerSala() {
    return this._serviceSala
      .getSala(this.salaId)
      .toPromise()
      .then((data) => {
        this.nuevoSlot.sala = data;
      });
  }

  addSlot() {
    this.obtenerActividad()
      .then(() => this.obtenerUsuario())
      .then(() => this.obtenerSala())
      .then(() => {
        this._service.createSlot(this.nuevoSlot).subscribe((data) => {
          alert("Slot Agregado!");
          window.location.reload();
        });
      });
  }
}
