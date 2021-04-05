import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoActividad } from '@modelsRest/TipoActividad';
import { TipoActividadServiceService } from '@servicesRest/tipo_actividad/tipo-actividad-service.service';

@Component({
  selector: 'app-tipo-actividad-add',
  templateUrl: './tipo-actividad-add.component.html',
  styleUrls: ['./tipo-actividad-add.component.css']
})
export class TipoActividadAddComponent implements OnInit {

  constructor(private service : TipoActividadServiceService, private router:Router) { }

  ngOnInit(): void {
  }

  addTipoActividad(tipoActividad : TipoActividad){
    this.service.createTipoActividad(tipoActividad).subscribe((data)=>{
      alert("agregado con éxito");
      window.location.reload();
    });
  }
}
