import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Sala } from "@modelsRest/Sala";
import { SalaServiceService } from "@servicesRest/sala/sala-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { HelperService } from "@core/services/helper.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-sala-list",
  templateUrl: "./sala-list.component.html",
  styleUrls: ["./sala-list.component.css"],
})
export class SalaListComponent implements OnInit {
  //list
  mostrarSalaAdd: boolean = false;
  salas: Sala[];

  //update
  salaUpdate: any;
  closeResult = "";
  textoModal: string;

  //confirm delete
  salaAux: any;

    //datatable
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _service: SalaServiceService,
    private _router: Router,
    private modalService: NgbModal,
    private _helperService: HelperService
  ) {}

  ngOnInit(): void {
    this._helperService.isNotRol("user");
    document.getElementById("minus").hidden = true;
    this._service.getSalas().subscribe((data) => {
      this.salas = data;
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
    this._service.deleteSalas(this.salaAux).subscribe((data) => {
      window.location.reload();
    });
  }

  update(modal) {
    this._service.updateSala(this.salaUpdate).subscribe(
      (data) => {
        this.textoModal = "¡Sala actualizada!";
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

  habilitarSala() {
    this.mostrarSalaAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }
  deshabilitarSala() {
    this.mostrarSalaAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

  open(content, sala: Sala) {
    this._service.getSala(sala.id).subscribe((data) => {
      this.salaUpdate = data;
    });
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  //modal coinfirm delete
  openModalDelete(confirmDelete, sala: Sala) {
    this.salaAux = sala;
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
