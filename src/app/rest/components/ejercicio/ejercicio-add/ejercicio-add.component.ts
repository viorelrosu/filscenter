import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TipoEjercicio } from "@modelsRest/TipoEjercicio";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EjercicioServiceService } from "@servicesRest/ejercicio/ejercicio-service.service";
import { TipoEjercicioServiceService } from "@servicesRest/tipo_ejercicio/tipo-ejercicio-service.service";

@Component({
  selector: "app-ejercicio-add",
  templateUrl: "./ejercicio-add.component.html",
  styleUrls: ["./ejercicio-add.component.css"],
})
export class EjercicioAddComponent implements OnInit {
  //add ejercicio
  nuevoEjercicio: any;
  //asignartipoEjercicio
  tipoEjercicioId: number;
  //preselect
  tipoEjerSelect = "";
  tiposEjercicio: TipoEjercicio[];
  
  constructor(
    private _service: EjercicioServiceService,
    private _serviceTipoEjercicio: TipoEjercicioServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.nuevoEjercicio = {};
  }

  ngOnInit(): void {
    this._serviceTipoEjercicio.getTipoEjercicios().subscribe((data) => {
      this.tiposEjercicio = data;
    });
  }

  obtenerUnTipoEjercicio() {
    return this._serviceTipoEjercicio
      .getTipoEjercicio(this.tipoEjercicioId)
      .toPromise()
      .then((data) => {
        this.nuevoEjercicio.tipoEjercicio = data;
      });
  }

  addEjercicio(create,errorModal) {
    this.obtenerUnTipoEjercicio().then(() => {
      this._service.createEjercicio(this.nuevoEjercicio).subscribe(
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
      });
    }
  
    refresh() {
      window.location.reload();
    }
  }