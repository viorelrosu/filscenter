import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TipoActividad } from "@modelsRest/TipoActividad";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActividadServiceService } from "@servicesRest/actividad/actividad-service.service";
import { TipoActividadServiceService } from "@servicesRest/tipo_actividad/tipo-actividad-service.service";

@Component({
  selector: "app-actividad-add",
  templateUrl: "./actividad-add.component.html",
  styleUrls: ["./actividad-add.component.css"],
})
export class ActividadAddComponent implements OnInit {
  nuevaActividad: any;
  tipoActividadId: number; //poner en number para coger del rest ????
  tiposActividades: TipoActividad[];
  tipoActiSelect = "";
  colorTipoActiSelect="";

  constructor(
    private service: ActividadServiceService,
    private serviceTipoActividad: TipoActividadServiceService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.nuevaActividad = {
      descripcion: "",
      dificultad: "",
      nombre: "",
      color:"",
      tipoActividad: {
        id: "",
        nombre: "",
      },
    };
  }

  ngOnInit(): void {
    this.serviceTipoActividad.getTipoActividades().subscribe((data) => {
      this.tiposActividades = data;
    });
    this.nuevaActividad.color="#ffffff";
  }

  obtenerUnTipoActividad() {
    return this.serviceTipoActividad
      .getTipoActividad(this.tipoActividadId)
      .toPromise()
      .then((data) => {
        this.nuevaActividad.tipoActividad = data;
      });
  }

  addActividad(create, errorModal) {
    this.obtenerUnTipoActividad().then(() => {
      this.service.createActividad(this.nuevaActividad).subscribe(
        (data) => {
          this.modalService.open(create, {
            ariaLabelledBy: "modal-basic-title",
            centered: true,
            size: "md",
          });
          setTimeout(function () {
            window.location.reload(), console.log("funciona");
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

  refresh(){
    window.location.reload();
  }
}
