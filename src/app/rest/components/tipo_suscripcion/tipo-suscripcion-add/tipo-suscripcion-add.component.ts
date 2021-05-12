import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TipoSuscripcionServiceService } from "@servicesRest/tipo_suscripcion/tipo-suscripcion-service.service";

@Component({
  selector: "app-tipo-suscripcion-add",
  templateUrl: "./tipo-suscripcion-add.component.html",
  styleUrls: ["./tipo-suscripcion-add.component.css"],
})
export class TipoSuscripcionAddComponent implements OnInit {
  nuevoTipoSuscripcion: any;
  constructor(
    private _service: TipoSuscripcionServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.nuevoTipoSuscripcion = {};
  }

  ngOnInit(): void {}

  addTipoSuscripcion(create, errorModal) {
    this._service.createTipoSuscripcion(this.nuevoTipoSuscripcion).subscribe(
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
