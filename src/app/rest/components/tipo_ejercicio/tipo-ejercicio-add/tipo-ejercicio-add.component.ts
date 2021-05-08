import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TipoEjercicio } from "@modelsRest/TipoEjercicio";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TipoEjercicioServiceService } from "@servicesRest/tipo_ejercicio/tipo-ejercicio-service.service";

@Component({
  selector: "app-tipo-ejercicio-add",
  templateUrl: "./tipo-ejercicio-add.component.html",
  styleUrls: ["./tipo-ejercicio-add.component.css"],
})
export class TipoEjercicioAddComponent implements OnInit {
  nuevoTipoEjercicio: any;

  constructor(
    private _service: TipoEjercicioServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.nuevoTipoEjercicio = {};
  }

  ngOnInit(): void {}

  addTipoEjercicio(create,errorModal) {
    this._service
      .createTipoEjercicio(this.nuevoTipoEjercicio)
      .subscribe((data) => {
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