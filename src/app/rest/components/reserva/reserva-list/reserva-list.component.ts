import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Reserva } from "@modelsRest/Reserva";
import { Slot } from "@modelsRest/Slot";
import { Usuario } from "@modelsRest/Usuario";
import { ReservaServiceService } from "@servicesRest/reserva/reserva-service.service";
import { SlotServiceService } from "@servicesRest/slot/slot-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { HelperService } from "@core/services/helper.service";

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
  usuarioId:any;
  slotId:any;
  slots: Slot[];
  textoModal: string;

  //confirm delete
  reservaAux: any;

  //filtros
  filterUser: string = "";
  filterError: boolean = false;
  mainTablaReserva: Reserva[];
  filterTabla: Reserva[];

  constructor(
    private _service: ReservaServiceService,
    private _serviceSlot: SlotServiceService,
    private _serviceUsuario: UsuarioServiceService,
    private router: Router,
    private modalService: NgbModal,
    private _helperService: HelperService
  ) {
    this.reservaUpdate = {};
  }

  ngOnInit(): void {
    this._helperService.isNotRol("user");
    document.getElementById("minus").hidden = true;
    this._service.getreservas().subscribe((data) => {
      this.reservas = data;
      this.mainTablaReserva = data;
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

  update(modal) {
    console.log(this.reservaUpdate);
    
    this._service.updateReserva(this.reservaUpdate).subscribe(
      (data) => {
        this.textoModal = "¡Reserva actualizada!";
        this.modalService.open(modal, {
          ariaLabelledBy: "modal-basic-title",
          centered: true,
          size: "md",
        });
      },
      (err) => {
        this.textoModal = "¡Error al actualizar!";
        this.modalService.open(modal, {
          ariaLabelledBy: "modal-basic-title",
          centered: true,
          size: "md",
        });
      }
    );
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
      .open(content, {
        ariaLabelledBy: "modal-basic-title",
        centered: true,
        size: "xl",
      })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  openModalDelete(confirmDelete, reserva: Reserva) {
    this.reservaAux = reserva;
    this.modalService
      .open(confirmDelete, {
        ariaLabelledBy: "modal-basic-title",
        centered: true,
        size: "md",
      })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  refresh() {
    window.location.reload();
  }

  keyPress(evento) {
    if (evento.keyCode == 13 && !evento.shiftKey) {
      this.filtrarTabla();
    }
  }

  filtrarTabla() {
    this.filterTabla = [];

    for (let reserva of this.mainTablaReserva) {
      if (
        reserva.usuario.nombre
          .toLowerCase()
          .indexOf(this.filterUser.toLowerCase()) > -1
      ) {
        this.filterTabla.push(reserva);
      }
    }

    if (this.filterTabla.length > 0) {
      this.filterError = false;
      this.reservas = this.filterTabla;
    } else {
      this.filterError = true;
      this.reservas = [];
    }
  }

  quitarFiltroTabla() {
    this.filterError = false;
    this.reservas = this.mainTablaReserva;
    this.filterUser = "";
  }
}
