import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { TipoSuscripcion } from "@modelsRest/TipoSuscripcion";
import { Usuario } from "@modelsRest/Usuario";
import { SuscripcionServiceService } from "@servicesRest/suscripcion/suscripcion-service.service";
import { TipoSuscripcionServiceService } from "@servicesRest/tipo_suscripcion/tipo-suscripcion-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";
import { HelperService } from "@core/services/helper.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Suscripcion } from "@modelsRest/suscripcion";
import { Subject } from "rxjs";

@Component({
  selector: "app-suscripcion-list",
  templateUrl: "./suscripcion-list.component.html",
  styleUrls: ["./suscripcion-list.component.css"],
})
export class SuscripcionListComponent implements OnInit {
  mostrarSuscripcionAdd: boolean = false;
  suscripciones: Suscripcion[];

  //update
  suscripcionUpdate: any;
  tiposSuscripcion: TipoSuscripcion[];
  usuarios: Usuario[];
  closeResult = "";
  textoModal: string;

  //confirm delete
  suscripcionAux: any;

  //filters
  filterName: string = "";
  filterError: boolean = false;
  mainTablaSuscripciones: Suscripcion[];
  filterTabla: Suscripcion[];

    //datatable
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _service: SuscripcionServiceService,
    private _serviceTipoSuscripcion: TipoSuscripcionServiceService,
    private _serviceUsuario: UsuarioServiceService,
    private _router: Router,
    private modalService: NgbModal,
    private _helperService: HelperService,
    private datePipe: DatePipe
  ) {
    this.suscripcionUpdate = {};
  }

  ngOnInit(): void {
    this._helperService.isRolOK("admin");
    document.getElementById("minusSuscripcion").hidden = true;
    this._service.getSuscripciones().subscribe((data) => {
      this.suscripciones = data;
      this.mainTablaSuscripciones = data;
      this.dtTrigger.next();
    });

    this._serviceTipoSuscripcion.getTiposSuscripcion().subscribe((data) => {
      this.tiposSuscripcion = data;
    });

    this._serviceUsuario.getUsuariosByRol(3).subscribe((data) => {
      this.usuarios = data;
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
    this._service.deleteSuscripcion(this.suscripcionAux).subscribe((data) => {
      window.location.reload();
    });
  }

  update(modal) {
    this._service.updateSuscripcion(this.suscripcionUpdate).subscribe(
      (data) => {
        this.textoModal = "¡Suscripción actualizada!";
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

  habilitarSuscripcion() {
    this.mostrarSuscripcionAdd = true;
    document.getElementById("plusSuscripcion").hidden = true;
    document.getElementById("minusSuscripcion").hidden = false;
  }

  deshabilitarSuscripcion() {
    this.mostrarSuscripcionAdd = false;
    document.getElementById("plusSuscripcion").hidden = false;
    document.getElementById("minusSuscripcion").hidden = true;
  }

  open(content, suscripcion: Suscripcion) {
    this._service.getSuscripcion(suscripcion.id).subscribe((data) => {
      this.suscripcionUpdate = data;
      this.suscripcionUpdate.fechaAlta = this.datePipe.transform(
        this.suscripcionUpdate.fechaAlta,
        "yyyy-MM-dd" /*'dd-MM-yyyy'*/
      );
      this.suscripcionUpdate.fechaBaja = this.datePipe.transform(
        this.suscripcionUpdate.fechaBaja,
        "yyyy-MM-dd" /*'dd-MM-yyyy'*/
      );
    });
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  //abre modal confirm delete
  openModalDelete(confirmDelete, suscripcion: Suscripcion) {
    this.suscripcionAux = suscripcion;
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
    for (let suscripcion of this.mainTablaSuscripciones) {
      if (
        suscripcion.usuario.nombre
          .toLocaleLowerCase()
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          .indexOf(this.filterName.toLocaleLowerCase()) > -1
      ) {
        this.filterTabla.push(suscripcion);
      }
    }
    if (this.filterTabla.length > 0) {
      this.filterError = false;
      this.suscripciones = this.filterTabla;
    } else {
      this.filterError = true;
      this.suscripciones = [];
    }
  }

  quitarFiltroTabla() {
    this.filterError = false;
    this.suscripciones = this.mainTablaSuscripciones;
    this.filterName = "";
  }
}
