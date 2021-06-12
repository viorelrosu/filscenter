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
import { HelperService } from "@core/services/helper.service";
import { Subject } from "rxjs";

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
  slotAux: any;

  //filtros
  filterSala: string = "";
  filterError: boolean = false;
  mainTablaSlot: Slot[];
  filterTabla: Slot[];

    //datatable
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

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
      this.mainTablaSlot = data;
      this.dtTrigger.next();
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

    this.dtOptions = {
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "_MENU_ elementos",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
        infoEmpty: "Mostrando ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      },
      pagingType: 'full_numbers',
      pageLength: 10,
      order:[[3, 'asc']]
    };
  }

  delete() {
    this._service.deleteSlot(this.slotAux).subscribe((data) => {
      window.location.reload();
    });
  }

  update(modal) {
    this._service.updateSlot(this.slotUpdate).subscribe(
      (data) => {
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
  openModalDelete(confirmDelete, slot) {
    this.slotAux = slot;
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

    for (let slot of this.mainTablaSlot) {
      if (
        slot.sala.numero.toString().indexOf(this.filterSala) > -1 ||
        slot.diaSemana
          .toLocaleLowerCase()
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          .indexOf(this.filterSala.toLocaleLowerCase()) > -1
      ) {
        this.filterTabla.push(slot);
      }
    }

    if (this.filterTabla.length > 0) {
      this.filterError = false;
      this.slots = this.filterTabla;
    } else {
      this.filterError = true;
      this.slots = [];
    }
  }
  quitarFiltroTabla() {
    this.filterError = false;
    this.slots = this.mainTablaSlot;
    this.filterSala = "";
  }
}
