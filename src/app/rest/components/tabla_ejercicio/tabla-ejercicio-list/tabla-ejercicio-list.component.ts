import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TablaEjercicio } from "@modelsRest/TablaEjercicio";
import { EjercicioSerieServiceService } from "@servicesRest/ejercicio_serie/ejercicio-serie-service.service";
import { TablaEjercicioServiceService } from "@servicesRest/tabla_ejercicio/tabla-ejercicio-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Usuario } from "@modelsRest/Usuario";
import { EjercicioSerie } from "@modelsRest/EjercicioSerie";
import { EjercicioServiceService } from "@servicesRest/ejercicio/ejercicio-service.service";
import { TipoEjercicio } from "@modelsRest/TipoEjercicio";
import { TipoEjercicioServiceService } from "@servicesRest/tipo_ejercicio/tipo-ejercicio-service.service";
import { Ejercicio } from "@modelsRest/Ejercicio";
import { HelperService } from "@core/services/helper.service";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";

@Component({
  selector: "app-tabla-ejercicio-list",
  templateUrl: "./tabla-ejercicio-list.component.html",
  styleUrls: ["./tabla-ejercicio-list.component.css"],
})
export class TablaEjercicioListComponent implements OnInit {
  //parte list
  mostrarTablaEjercicioAdd: boolean = false;
  tablasEjercicio: TablaEjercicio[];

  //parte update tablaEjercicio
  tablaUpdate: any;
  monitores: Usuario[];
  suscriptores: Usuario[];
  closeResult = "";
  inicio = new Date();

  //parte Detalle tabla
  tablaDetalle: any;
  ejerciciosSerieTablaDetalle: EjercicioSerie[];

  //abrir añadir ejercicioSerieModal
  modalAniadir = false;
  tiposEjercicio: TipoEjercicio[];
  ejerciciosSerie: EjercicioSerie[];
  ejercicios: Ejercicio[];
  nuevoEjercicioSerie: any;
  ejercicioId: any;
  tipoEjerSelect = "";
  ejerSelect = "";
  content: any;
  tipoEjercicioId: any;

  //parte update EjercicioSerie
  ejercicioSerieUpdate: any;

  //confirm delete
  tablaAux: any;
  //confirm delete ejer serie
  ejercicioAux: any;

  //modales
  textoModalT :string;
  textoModal: string;

  //filtros tabla ejer
  filterName: string = "";
  filterError: boolean = false;
  mainTablaTablaEjercicios: TablaEjercicio[];
  filterTabla: TablaEjercicio[];

  //filtros ejer serie
  filterDia: string = "1";
  filterErrorES: boolean = false;
  mainTablaEjerciciosSerie: EjercicioSerie[];
  filterTablaES: EjercicioSerie[];

  //datatable
  dtOptions: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();

  constructor(
    private _service: TablaEjercicioServiceService,
    private _serviceEjercicio: EjercicioServiceService,
    private _serviceTipoEjercicio: TipoEjercicioServiceService,
    private _serviceEjerciciosSerie: EjercicioSerieServiceService,
    private _serviceUsuario: UsuarioServiceService,
    private _router: Router,
    private modalService: NgbModal,
    private _helperService: HelperService,
    private datePipe: DatePipe
  ) {
    this.tablaUpdate = {};
    this.tablaDetalle = {};
    this.nuevoEjercicioSerie = {};
    this.ejercicioSerieUpdate = {};
  }

  ngOnInit(): void {
    this._helperService.isNotRol("user");
    document.getElementById("minus").hidden = true;

    this._service.getTablasEjercicios().subscribe((data) => {
      this.tablasEjercicio = data;
      this.mainTablaTablaEjercicios = data;
      this.dtTrigger.next();
    });

    this._serviceUsuario.getUsuariosByRol(3).subscribe((data) => {
      this.suscriptores = data;
    });
    this._serviceUsuario.getUsuariosByRol(2).subscribe((data) => {
      this.monitores = data;
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
          last: "Último",
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending:
            ": Activar para ordenar la tabla en orden descendente",
        },
      },
      pagingType: "full_numbers",
      pageLength: 10,
    };

    this.dtOptions2 = {
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
          last: "Último",
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending:
            ": Activar para ordenar la tabla en orden descendente",
        },
      },
      pagingType: "full_numbers",
      pageLength: 10,
      order: [[4, "asc"]],
    };
  }

  delete() {
    this._service.deleteTablaEjercicio(this.tablaAux).subscribe((data) => {
      window.location.reload();
    });
  }

  update(modal) {
    this._service.updateTablaEjercicio(this.tablaUpdate).subscribe(
      (data) => {
        this.textoModalT = "¡tabla de Ejercicio actualizada!";
        this.modalService.open(modal, {
          ariaLabelledBy: "modal-basic-title",
          centered: true,
          size: "md",
        });
      },
      (err) => {
        this.textoModalT = "¡Error al actualizar!";
        this.modalService.open(modal, {
          ariaLabelledBy: "modal-basic-title",
          centered: true,
          size: "md",
        });
      }
    );
    
  }

  habilitarTablaEjercicio() {
    this.mostrarTablaEjercicioAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }

  deshabilitarTablaEjercicio() {
    this.mostrarTablaEjercicioAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

  //desplegar añadir ejercicios en modal
  abrirAniadirModal(info) {
    this.tipoEjerSelect = "";
    this.modalAniadir = info;
    document.getElementById("ejerPlus").hidden = true;
    document.getElementById("ejerMinus").hidden = false;
  }
  cerrarAniadirModal(info) {
    this.modalAniadir = info;
    document.getElementById("ejerPlus").hidden = false;
    document.getElementById("ejerMinus").hidden = true;
  }

  //cargar ejercicios para añadir desde modal
  cargarEjercicios(id, param) {
    this._serviceEjercicio
      .getEjerciciosPorTipoEjercicioId(id)
      .subscribe((data) => {
        this.ejercicios = data;
        console.log(this.ejercicios);
        this.ejerSelect = "";
        if (param == "si") {
          this.ejercicioSerieUpdate.ejercicio.id = "";
        }
      });
  }

  //id para obtener el ejercicio seleccionado
  obtenerEjercicioParaCreacionPorModal() {
    return this._serviceEjercicio
      .getEjercicio(this.ejercicioId)
      .toPromise()
      .then((data) => {
        this.nuevoEjercicioSerie.ejercicio = data;
      });
  }

  //añadir ejercicio serie desde modal
  aniadirEjercicioSerie(detalle, tablaDetalle, createEjer, errorModalEjer) {
    this.obtenerEjercicioParaCreacionPorModal().then(() => {
      this.nuevoEjercicioSerie.tablaEjercicio = tablaDetalle;
      this._serviceEjerciciosSerie
        .createEjercicioSerie(this.nuevoEjercicioSerie)
        .subscribe(
          (data) => {
            this.modalService.open(createEjer, {
              ariaLabelledBy: "modal-basic-title",
              centered: true,
              size: "md",
            });
          },
          (err) => {
            this.textoModal = "¡Hubo un error!";
            this.modalService.open(errorModalEjer, {
              ariaLabelledBy: "modal-basic-title",
              centered: true,
              size: "md",
            });
          }
        );
    });
  }

  closeUpdateOrAddModalResult() {
    this.modalService.dismissAll();
    this.modalAniadir = false;
    this.openDetalleTabla(this.content, this.tablaDetalle);
    this.nuevoEjercicioSerie = {};
    this.ejerSelect = "";
  }

  modalUpdateEjercicioSerie(updateES, ejercicioSerie) {
    this.ejercicioSerieUpdate = ejercicioSerie;
    this.cargarEjercicios(
      this.ejercicioSerieUpdate.ejercicio.tipoEjercicio.id,
      "no"
    );

    this.modalService
      .open(updateES, {
        ariaLabelledBy: "modal-basic-title",
        centered: true,
        size: "lg",
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {}
      );
  }

  deleteEjercicioSerie() {
    console.log(this.ejercicioAux);
    this._serviceEjerciciosSerie
      .deleteEjercicioSerie(this.ejercicioAux)
      .subscribe((data) => {
        this.modalService.dismissAll();
        this.openDetalleTabla(this.content, this.tablaDetalle);
      });
  }

  updateEjercicio(modal) {
    this._serviceEjerciciosSerie
      .updateEjercicioSerie(this.ejercicioSerieUpdate)
      .subscribe((data) => {
        this.textoModal = "¡Ejercicio actualizado!";
        this.modalService.open(modal, {
          ariaLabelledBy: "modal-basic-title",
          centered: true,
          size: "md",
        }),
          (err) => {
            this.textoModal = "¡Error al actualizar!";
            this.modalService.open(modal, {
              ariaLabelledBy: "modal-basic-title",
              centered: true,
              size: "md",
            });
          };
      });
  }

  //modal detalle tabla
  openDetalleTabla(detalle, tabla: TablaEjercicio) {
    this.filterDia = "1";
    this.tipoEjercicioId = "";
    this.content = detalle;
    this.tablaDetalle = tabla;
    this._serviceEjercicio.getEjercicios().subscribe((data) => {
      this.tiposEjercicio = data;
    });

    this._serviceTipoEjercicio.getTipoEjercicios().subscribe((data) => {
      this.tiposEjercicio = data;
    });

    this._serviceEjerciciosSerie
      .getEjerciciosPorTablaId(tabla.id)
      .subscribe((data) => {
        this.ejerciciosSerieTablaDetalle = data;
        this.mainTablaEjerciciosSerie = data;

        //this.dtTrigger2.next();

        this.filtrarTablaES();
      });
    this.modalService
      .open(detalle, {
        ariaLabelledBy: "modal-basic-title",
        centered: true,
        size: "xl",
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {}
      );
  }

  //modal update tabla
  open(content, tabla: TablaEjercicio) {
    this._service.getTablaEjercicio(tabla.id).subscribe((data) => {
      this.tablaUpdate = data;
      this.tablaUpdate.fechaInicio = this.datePipe.transform(
        this.tablaUpdate.fechaInicio,
        "yyyy-MM-dd" /*'dd-MM-yyyy'*/
      );
      this.tablaUpdate.fechaFin = this.datePipe.transform(
        this.tablaUpdate.fechaFin,
        "yyyy-MM-dd" /*'dd-MM-yyyy'*/
      );
      this.inicio = this.tablaUpdate.fechaInicio;
    });
    this.modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title",
        centered: true,
        size: "xl",
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {}
      );
  }

  //modal coinfirm delete
  openModalDelete(confirmDelete, tabla: TablaEjercicio) {
    this.tablaAux = tabla;
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
  //modal coinfirm delete ejerSerie
  openModalDeleteEjerSerie(confirmDeleteEjerSerie, ejercicio: EjercicioSerie) {
    this.ejercicioAux = ejercicio;
    this.modalService
      .open(confirmDeleteEjerSerie, {
        ariaLabelledBy: "modal-basic-title",
        centered: true,
        size: "md",
      })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  keyPress(evento) {
    if (evento.keyCode == 13 && !evento.shiftKey) {
      this.filtrarTabla();
    }
  }
  keyPressES(evento) {
    if (evento.keyCode == 13 && !evento.shiftKey) {
      this.filtrarTablaES();
    }
  }

  filtrarTabla() {
    this.filterTabla = [];

    for (let tabla of this.mainTablaTablaEjercicios) {
      if (
        tabla.monitor.nombre
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .indexOf(this.filterName.toLowerCase()) > -1 ||
        tabla.suscriptor.nombre
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .indexOf(this.filterName.toLowerCase()) > -1
      ) {
        this.filterTabla.push(tabla);
      }
    }

    if (this.filterTabla.length > 0) {
      this.filterError = false;
      this.tablasEjercicio = this.filterTabla;
    } else {
      this.filterError = true;
      this.tablasEjercicio = [];
    }
  }

  filtrarTablaES() {
    this.filterTablaES = [];

    for (let ejercicioSerie of this.mainTablaEjerciciosSerie) {
      if (ejercicioSerie.porSemana.toString().indexOf(this.filterDia) > -1) {
        this.filterTablaES.push(ejercicioSerie);
      }
    }

    if (this.filterTablaES.length > 0) {
      this.filterErrorES = false;
      this.ejerciciosSerieTablaDetalle = this.filterTablaES;
    } else {
      this.filterErrorES = true;
      this.ejerciciosSerieTablaDetalle = [];
    }
  }

  quitarFiltroTabla() {
    this.filterError = false;
    this.tablasEjercicio = this.mainTablaTablaEjercicios;
    this.filterName = "";
  }
  quitarFiltroTablaES() {
    this.filterErrorES = false;
    this.ejerciciosSerieTablaDetalle = this.mainTablaEjerciciosSerie;
    this.filterDia = "";
  }
  
  refresh() {
    window.location.reload();
  }
}
