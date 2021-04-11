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

    this._serviceUsuario.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  delete(reserva: Reserva) {
    this._service.deleteReserva(reserva).subscribe((data) => {
      this.reservas = this.reservas.filter((p) => p != reserva);
      alert("Reserva eliminada");
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
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
