import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Taquilla } from "@modelsRest/Taquilla";
import { TaquillaServiceService } from "@servicesRest/taquilla/taquilla-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { HelperService } from "@core/services/helper.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-taquilla-list",
  templateUrl: "./taquilla-list.component.html",
  styleUrls: ["./taquilla-list.component.css"],
})
export class TaquillaListComponent implements OnInit {
  mostrarTaquillaAdd: boolean = false;
  taquillas: Taquilla[];

  //update
  taquillaUpdate: any;
  textoModal: string;

  //confirm delete
  taquillaAux: any;

    //datatable
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _service: TaquillaServiceService,
    private _router: Router,
    private modalService: NgbModal,
    private _helperService: HelperService
  ) {
    this.taquillaAux = {};
  }

  ngOnInit(): void {
    this._helperService.isRolOK("admin");

    document.getElementById("minus").hidden = true;
    this._service.getTaquillas().subscribe((data) => {
      this.taquillas = data;
      this.dtTrigger.next();
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
    this._service.deleteTaquilla(this.taquillaAux).subscribe((data) => {
      window.location.reload();
    });
  }

  update(modal) {
    this._service.updateTaquilla(this.taquillaUpdate).subscribe(
      (data) => {
        this.textoModal = "¡Taquilla actualizada!";
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

  habilitarTaquilla() {
    this.mostrarTaquillaAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }
  deshabilitarTaquilla() {
    this.mostrarTaquillaAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

  open(content, taquilla: Taquilla) {
    this._service.getTaquilla(taquilla.id).subscribe((data) => {
      this.taquillaUpdate = data;
    });
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
  //abre modal confirm delete
  openModalDelete(confirmDelete, taquilla: Taquilla) {
    this.taquillaAux = taquilla;
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
}
