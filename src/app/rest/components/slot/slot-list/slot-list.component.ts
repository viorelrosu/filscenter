import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Actividad } from "@modelsRest/Actividad";
import { Sala } from "@modelsRest/sala";
import { Slot } from "@modelsRest/Slot";
import { Usuario } from "@modelsRest/Usuario";
import { ActividadServiceService } from "@servicesRest/actividad/actividad-service.service";
import { SalaServiceService } from "@servicesRest/sala/sala-service.service";
import { SlotServiceService } from "@servicesRest/slot/slot-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-slot-list",
  templateUrl: "./slot-list.component.html",
  styleUrls: ["./slot-list.component.css"],
})
export class SlotListComponent implements OnInit {
  //list
  mostrarSlotAdd: boolean = false;
  slots: Slot[];

  //update
  slotUpdate: any;
  monitores: Usuario[];
  actividades: Actividad[];
  salas: Sala[];
  closeResult = "";

  constructor(
    private _service: SlotServiceService,
    private _serviceActividad: ActividadServiceService,
    private _serviceSala: SalaServiceService,
    private _serviceMonitor: UsuarioServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.slotUpdate = {};
  }

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this._service.getSlots().subscribe((data) => {
      this.slots = data;
    });

    this._serviceActividad.getActividades().subscribe((data) => {
      this.actividades = data;
    });

    this._serviceMonitor.getUsuarios().subscribe((data) => {
      this.monitores = data;
    });

    this._serviceSala.getSalas().subscribe((data) => {
      this.salas = data;
    });
  }

  delete(slot: Slot) {
    this._service.deleteSlot(slot).subscribe((data) => {
      this.slots = this.slots.filter((p) => p != slot);
      alert("Slot Eliminado");
    });
  }

  update(){
    this._service.updateSlot(this.slotUpdate).subscribe(data=>{
      alert("Slot Actualizado!");
      this.modalService.dismissAll();
    });
    window.location.reload();
  }

  habilitarSlot() {
    this.mostrarSlotAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }

  deshabilitarSlot() {
    this.mostrarSlotAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

  open(content, slot: Slot) {
    this._service.getSlot(slot.id).subscribe((data) => {
      this.slotUpdate = data;
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
