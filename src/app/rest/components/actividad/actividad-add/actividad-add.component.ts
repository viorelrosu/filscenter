 import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TipoActividad } from "@modelsRest/TipoActividad";
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

  constructor(
    private service: ActividadServiceService,
    private serviceTipoActividad: TipoActividadServiceService,
    private router: Router
  ) {
    this.nuevaActividad = {
      descripcion: "",
      dificultad: "",
      nombre: "",
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
  }

  obtenerUnTipoActividad() {
    return this.serviceTipoActividad.getTipoActividad(this.tipoActividadId).toPromise()
    .then(data => {
      this.nuevaActividad.tipoActividad = data;
    });
  }

   addActividad() {
     this.obtenerUnTipoActividad()
    .then(()=>{
      //console.log(this.nuevaActividad);
      this.service.createActividad(this.nuevaActividad).subscribe((data) => {
        alert("Actividad agregada");
        window.location.reload();
      },(err)=>{
        alert("error")
      });
    });

    /*
    await this.serviceTipoActividad
    .getTipoActividad(this.tipoActividadId).toPromise()
    .then(data => {
      this.nuevaActividad.tipoActividad = data;
    })
    .then(()=>{
      console.log(this.nuevaActividad);
      this.service.createActividad(this.nuevaActividad).subscribe((data) => {
        alert("Actividad agregada");
        window.location.reload();
      },(err)=>{
        alert("error")
      });
    });
    */

  }
}
