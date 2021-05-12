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
import { HelperService } from '@core/services/helper.service';

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
  textoModal: string;

  //confirm delete
  slotAux:any;

  constructor(
    private _service: SlotServiceService,
    private _serviceActividad: ActividadServiceService,
    private _serviceSala: SalaServiceService,
    private _serviceMonitor: UsuarioServiceService,
    private _router: Router,
    private modalService: NgbModal,
    private _helperService: HelperService
  ) {
    this.slotUpdate = {};
  }

  ngOnInit(): void {
    this._helperService.isNotRol("user");

    document.getElementById("minus").hidden = true;
    this._service.getSlots().subscribe((data) => {
      this.slots = data;
    });

    this._serviceActividad.getActividades().subscribe((data) => {
      this.actividades = data;
    });
  //este número de rolId irá en función de el script definitivo de roles en la bbdd
    this._serviceMonitor.getUsuariosByRol(2).subscribe((data) => {
      this.monitores = data;
    });

    this._serviceSala.getSalas().subscribe((data) => {
      this.salas = data;
    });
  }

  delete() {
    this._service.deleteSlot(this.slotAux).subscribe((data) => {
      window.location.reload();
    });
  }

  update(modal){
    this._service.updateSlot(this.slotUpdate).subscribe(data=>{
      this.textoModal = "¡Slot actualizado!";
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
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true,size:"xl" })
      .result.then(
        (result) => {
        },
        (reason) => {
        }
      );
  }
  openModalDelete(confirmDelete, slot){
    this.slotAux = slot;
    this.modalService
    .open(confirmDelete, { ariaLabelledBy: "modal-basic-title", centered: true, size : "md"})
    .result.then(
      (result) => {
      },
      (reason) => {
      }
    );
  }

  refresh() {
    window.location.reload();
  }

}
