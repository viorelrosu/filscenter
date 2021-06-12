import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TipoActividad } from "@modelsRest/TipoActividad";
import { TipoActividadServiceService } from "../../../services/tipo_actividad/tipo-actividad-service.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from "rxjs";

@Component({
  selector: "app-tipo-actividad-list",
  templateUrl: "./tipo-actividad-list.component.html",
  styleUrls: ["./tipo-actividad-list.component.css"],
})
export class TipoActividadListComponent implements OnInit {

  mostrarTipoActividadAdd: boolean = false;

  tipoActividades: TipoActividad[];
  //update
  tipoActividadUpdate:any;
  textoModal: string;

  //confirm delete
  tipoActividadAux:any;

    //datatable
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _service: TipoActividadServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.tipoActividadUpdate={};
  }

  ngOnInit(): void {
    
    document.getElementById("minus").hidden = true;

    this._service.getTipoActividades().subscribe((data) => {
      this.tipoActividades = data;
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

  habilitarTipoActividad() {
    this.mostrarTipoActividadAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }

  deshabilitarTipoActividad() {
    this.mostrarTipoActividadAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }


  delete() {
    this._service.deleteTipoActividad(this.tipoActividadAux).subscribe((data) => {
      window.location.reload();
    });
  }

  update(modal){
    this._service.updateTipoActividad(this.tipoActividadUpdate).subscribe(data=>{
      this.textoModal = "¡Tipo actividad actualizada!";
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

  open(content,tipoActividad:TipoActividad) {
    this._service.getTipoActividad(tipoActividad.id).subscribe(data=>{
      this.tipoActividadUpdate = data;
    })
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered:true,size:"md"}).result.then((result) => {
    }, (reason) => {
    });
  }

  openModalDelete(confirmDelete, tipoActividad:TipoActividad){
    this.tipoActividadAux = tipoActividad;
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
