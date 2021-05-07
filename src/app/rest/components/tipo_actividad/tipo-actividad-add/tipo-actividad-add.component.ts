import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TipoActividad } from "@modelsRest/TipoActividad";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TipoActividadServiceService } from "@servicesRest/tipo_actividad/tipo-actividad-service.service";

@Component({
  selector: "app-tipo-actividad-add",
  templateUrl: "./tipo-actividad-add.component.html",
  styleUrls: ["./tipo-actividad-add.component.css"],
})
export class TipoActividadAddComponent implements OnInit {
  nuevoTipoActividad: any;

  constructor(
    private service: TipoActividadServiceService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.nuevoTipoActividad = {};
  }

  ngOnInit(): void {}

  addTipoActividad(create, errorModal) {
    this.service.createTipoActividad(this.nuevoTipoActividad).subscribe(
      (data) => {
        this.modalService.open(create, {
          ariaLabelledBy: "modal-basic-title",
          centered: true,
          size: "md",
        });
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      },
      (err) => {
        this.modalService.open(errorModal, {
          ariaLabelledBy: "modal-basic-title",
          centered: true,
          size: "md",
        });
      }
    );
  }

  refresh() {
    window.location.reload();
  }
}
