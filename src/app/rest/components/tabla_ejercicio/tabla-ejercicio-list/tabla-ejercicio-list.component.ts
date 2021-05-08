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
  nuevoEjercicioSerie: any;
  ejercicioId: number;
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
  textoModal:string;

  constructor(
    private _service: TablaEjercicioServiceService,
    private _serviceEjercicio: EjercicioServiceService,
    private _serviceTipoEjercicio: TipoEjercicioServiceService,
    private _serviceEjerciciosSerie: EjercicioSerieServiceService,
    private _serviceUsuario: UsuarioServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.tablaUpdate = {};
    this.tablaDetalle = {};
    this.nuevoEjercicioSerie = {};
    this.ejercicioSerieUpdate = {};
  }

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;

    this._service.getTablasEjercicios().subscribe((data) => {
      this.tablasEjercicio = data;
    });

    this._serviceUsuario.getUsuariosByRol(1).subscribe((data) => {
      this.suscriptores = data;
    });
    this._serviceUsuario.getUsuariosByRol(3).subscribe((data) => {
      this.monitores = data;
    });
  }

  delete() {
    this._service.deleteTablaEjercicio(this.tablaAux).subscribe((data) => {
      window.location.reload();
    });
  }

  update() {
    this._service.updateTablaEjercicio(this.tablaUpdate).subscribe((data) => {
      alert("Tabla Actualizada!");
      this.modalService.dismissAll();
    });
    window.location.reload();
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
    this.modalAniadir = info;
  }

  //cargar ejercicios para añadir desde modal
  cargarEjercicios(id, param) {
    this._serviceEjercicio
      .getEjerciciosPorTipoEjercicioId(id)
      .subscribe((data) => {
        this.ejerciciosSerie = data;
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

  prueba() {
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

  updateEjercicio() {
    this._serviceEjerciciosSerie
      .updateEjercicioSerie(this.ejercicioSerieUpdate)
      .subscribe((data) => {
        this.modalService.dismissAll();
        this.openDetalleTabla(this.content, this.tablaDetalle);
      });
  }

  //modal detalle tabla
  openDetalleTabla(detalle, tabla: TablaEjercicio) {
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
}
