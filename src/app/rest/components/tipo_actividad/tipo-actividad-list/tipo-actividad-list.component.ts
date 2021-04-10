import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TipoActividad } from "@modelsRest/TipoActividad";
import { TipoActividadServiceService } from "../../../services/tipo_actividad/tipo-actividad-service.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-tipo-actividad-list",
  templateUrl: "./tipo-actividad-list.component.html",
  styleUrls: ["./tipo-actividad-list.component.css"],
})
export class TipoActividadListComponent implements OnInit {

  mostrarTipoActividadAdd: boolean = false;
  private closeResult:string = '';

  tipoActividades: TipoActividad[];

  tipoActividadUpdate:any;

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
    });
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


  delete(tipoActividad: TipoActividad) {
    this._service.deleteTipoActividad(tipoActividad).subscribe((data) => {
      this.tipoActividades = this.tipoActividades.filter(
        (p) => p != tipoActividad
      );
      window.location.reload();
      alert("Tipo de Actividad eliminado");
    });
  }

  update(){
    this._service.updateTipoActividad(this.tipoActividadUpdate).subscribe(data=>{
      alert("Tipo actividad actualizada!");
      this.modalService.dismissAll();    
    });
    window.location.reload();
  }

  open(content,tipoActividad:TipoActividad) {
    this._service.getTipoActividad(tipoActividad.id).subscribe(data=>{
      this.tipoActividadUpdate = data;
    })
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered:true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
