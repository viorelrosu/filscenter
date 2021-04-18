import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Actividad } from "@modelsRest/Actividad";
import { TipoActividad } from "@modelsRest/TipoActividad";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ActividadServiceService } from "@servicesRest/actividad/actividad-service.service";
import { TipoActividadServiceService } from "@servicesRest/tipo_actividad/tipo-actividad-service.service";
import { HelperService } from '@core/services/helper.service';

@Component({
  selector: "app-actividad-list",
  templateUrl: "./actividad-list.component.html",
  styleUrls: ["./actividad-list.component.css"],
})
export class ActividadListComponent implements OnInit {
  closeResult = "";
  actividadUpdate: any;
  actividades: Actividad[];
  tiposActividades: TipoActividad[];

  constructor(
    private _service: ActividadServiceService,
    private _serviceTipoActividad:TipoActividadServiceService,
    private _router: Router,
    private modalService: NgbModal,
    private _helperService: HelperService
  ) {
    this.actividadUpdate = {};
  }

  ngOnInit(): void {
    this._helperService.isRolOK('admin');
    document.getElementById("minusActividad").hidden = true;

    this._service.getActividades().subscribe((data) => {
      this.actividades = data;
    });

    this._serviceTipoActividad.getTipoActividades().subscribe((data) => {
      this.tiposActividades = data;
    });
  }

  delete(actividad: Actividad) {
    this._service.deleteActividad(actividad).subscribe((data) => {
      this.actividades = this.actividades.filter((p) => p != actividad);
      alert("Actividad eliminado");
      window.location.reload();
    });
  }
  update() {
    this._service.updateActividad(this.actividadUpdate).subscribe((data) => {
      alert("Actividad Actualizada!");
      this.modalService.dismissAll();
    });
    window.location.reload();
  }

  mostrarActividadAdd = false;
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

  open(content, actividad: Actividad) {
    this._service.getActividad(actividad.id).subscribe((data) => {
      this.actividadUpdate = data;
    });
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
