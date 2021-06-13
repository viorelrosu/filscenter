import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Slot } from "@modelsRest/Slot";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ReservaServiceService } from "@servicesRest/reserva/reserva-service.service";
import { SlotServiceService } from "@servicesRest/slot/slot-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";
import { Usuario } from "@shared/models/usuario";

@Component({
  selector: "app-reserva-add",
  templateUrl: "./reserva-add.component.html",
  styleUrls: ["./reserva-add.component.css"],
})
export class ReservaAddComponent implements OnInit {
  nuevaReserva: any;
  usuarioId: number;
  slotId: number;

  reservaRecurrenteSelect = "";
  reservaSlotSelect = "";
  reservaUsuarioSelect = "";
  slots: Slot[];
  usuarios: Usuario[];

  dias : string[] = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sábado","Domingo"];

  constructor(
    private _serviceUsuario: UsuarioServiceService,
    private _serviceSlot: SlotServiceService,
    private _service: ReservaServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.nuevaReserva = {};
  }

  ngOnInit(): void {
    this._serviceUsuario.getUsuariosByRol(3).subscribe((data) => {
      this.usuarios = data;   
      this.usuarios.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))
    });

    this._serviceSlot.getSlots().subscribe((data) => {
      this.slots = data;
      this.slots.sort((a,b) => (a.actividad.nombre > b.actividad.nombre) ? -1 : ((b.actividad.nombre > a.actividad.nombre) ? 1
       : 0))
    });
  }

  obtenerUsuario() {
    return this._serviceUsuario
      .getUsuario(this.usuarioId)
      .toPromise()
      .then((data) => {
        this.nuevaReserva.usuario = data;
      });
  }

  obtenerSlot() {
    return this._serviceSlot
      .getSlot(this.slotId)
      .toPromise()
      .then((data) => {
        this.nuevaReserva.slot = data;
      });
  }
  addReserva(create, errorModal) {
    this.nuevaReserva.fechaInicio = new Date().toISOString();
    this.obtenerSlot()
      .then(() => this.obtenerUsuario())
      .then(() => {
        this._service.createReserva(this.nuevaReserva).subscribe(
          (data) => {
            console.log(this.nuevaReserva);
            this.modalService.open(create, {
              ariaLabelledBy: "modal-basic-title",
              centered: true,
              size: "md",
            });
            /*setTimeout(function () {
              window.location.reload();
            }, 3000);*/
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
