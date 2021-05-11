import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Reserva } from "@modelsRest/Reserva";
import { Slot } from "@modelsRest/Slot";
import { Usuario } from "@modelsRest/Usuario";
import { ReservaServiceService } from "@servicesRest/reserva/reserva-service.service";
import { SlotServiceService } from "@servicesRest/slot/slot-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-reserva-list",
  templateUrl: "./reserva-list.component.html",
  styleUrls: ["./reserva-list.component.css"],
})
export class ReservaListComponent implements OnInit {
  mostrarReservaAdd: boolean = false;
  reservas: Reserva[];

  //update
  reservaUpdate: any;
  usuarios: Usuario[];
  slots: Slot[];
  closeResult = "";

  //confirm delete
  reservaAux:any;

  constructor(
    private _service: ReservaServiceService,
    private _serviceSlot: SlotServiceService,
    private _serviceUsuario: UsuarioServiceService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.reservaUpdate = {};
  }

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this._service.getreservas().subscribe((data) => {
      this.reservas = data;
    });

    this._serviceSlot.getSlots().subscribe((data) => {
      this.slots = data;
    });

    this._serviceUsuario.getUsuariosByRol(3).subscribe((data) => {
      this.usuarios = data;
    });
  }

  delete() {
    this._service.deleteReserva(this.reservaAux).subscribe((data) => {
   window.location.reload();
    });
  }

  update() {
    this._service.updateReserva(this.reservaUpdate).subscribe((data) => {
      alert("Reserva Actualizada!");
      this.modalService.dismissAll();
    });
    window.location.reload();
  }

  habilitarReserva() {
    this.mostrarReservaAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }
  deshabilitarReserva() {
    this.mostrarReservaAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

  open(content, reserva: Reserva) {
    this._service.getReserva(reserva.id).subscribe((data) => {
      this.reservaUpdate = data;
    });
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
        },
        (reason) => {
        }
      );
  }

  openModalDelete(confirmDelete, reserva:Reserva){
    this.reservaAux = reserva;
    this.modalService
    .open(confirmDelete, { ariaLabelledBy: "modal-basic-title", centered: true, size : "md"})
    .result.then(
      (result) => {
      },
      (reason) => {
      }
    );
  }

}
