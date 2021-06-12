import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Actividad } from "@modelsRest/Actividad";
import { TipoActividad } from "@modelsRest/TipoActividad";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ActividadServiceService } from "@servicesRest/actividad/actividad-service.service";
import { TipoActividadServiceService } from "@servicesRest/tipo_actividad/tipo-actividad-service.service";
import { HelperService } from "@core/services/helper.service";
import { Subject } from 'rxjs';

@Component({
  selector: "app-actividad-list",
  templateUrl: "./actividad-list.component.html",
  styleUrls: ["./actividad-list.component.css"],
})
export class ActividadListComponent implements OnInit {
  mostrarActividadAdd = false;

  //update
  actividadUpdate: any;

  actividades: Actividad[];
  tiposActividades: TipoActividad[];
  textoModal: string;

  //parte confirm delete
  actividadAux: any;

  //filtro
  filterActividad: string = "";
  filterError: boolean = false;
  mainTablaActividad: Actividad[];
  filterTabla: Actividad[];

    //datatable
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _service: ActividadServiceService,
    private _serviceTipoActividad: TipoActividadServiceService,
    private _router: Router,
    private modalService: NgbModal,
    private _helperService: HelperService
  ) {
    this.actividadUpdate = {};
  }

  ngOnInit(): void {
    this._helperService.isNotRol("user");
    document.getElementById("minusActividad").hidden = true;

    this._service.getActividades().subscribe((data) => {
      this.actividades = data;
      this.mainTablaActividad = data;
      this.dtTrigger.next();
    });

    this._serviceTipoActividad.getTipoActividades().subscribe((data) => {
      this.tiposActividades = data;
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
      pageLength: 10
    };
  }

  delete() {
    this._service.deleteActividad(this.actividadAux).subscribe((data) => {
      window.location.reload();
    });
  }
  update(modal) {
    this._service.updateActividad(this.actividadUpdate).subscribe(
      (data) => {
        this.textoModal = "¡Actividad actualizada!";
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

  habilitarActividad() {
    this.mostrarActividadAdd = true;
    document.getElementById("plusActividad").hidden = true;
    document.getElementById("minusActividad").hidden = false;
  }

  deshabilitarActividad() {
    this.mostrarActividadAdd = false;
    document.getElementById("plusActividad").hidden = false;
    document.getElementById("minusActividad").hidden = true;
  }

  //abre modal confirm delete
  openModalDelete(confirmDelete, actividad) {
    this.actividadAux = actividad;
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

  //modal ventada update
  open(content, actividad: Actividad) {
    this._service.getActividad(actividad.id).subscribe((data) => {
      this.actividadUpdate = data;
    });
    this.modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title",
        centered: true,
        size: "lg",
      })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  refresh() {
    window.location.reload();
  }
  /*
  keyPress(evento) {
    if (evento.keyCode == 13 && !evento.shiftKey) {
      this.filtrarTabla();
    }
  }

  filtrarTabla() {
    this.filterTabla = [];

    for (let actividad of this.mainTablaActividad) {
      if (
        actividad.nombre
          .toLowerCase()
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          .indexOf(this.filterActividad.toLowerCase()) > -1 ||
        actividad.tipoActividad.nombre
          .toLowerCase()
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          .indexOf(this.filterActividad.toLowerCase()) > -1
      ) {
        this.filterTabla.push(actividad);
      }
    }

    if (this.filterTabla.length > 0) {
      this.filterError = false;
      this.actividades = this.filterTabla;
    } else {
      this.filterError = true;
      this.actividades = [];
    }
  }

  quitarFiltroTabla() {
    this.filterError = false;
    this.actividades = this.mainTablaActividad;
    this.filterActividad = "";
  }*/
}
