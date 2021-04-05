import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoEjercicio } from '@modelsRest/TipoEjercicio';
import { TipoEjercicioServiceService } from '@servicesRest/tipo_ejercicio/tipo-ejercicio-service.service';

@Component({
  selector: 'app-tipo-ejercicio-add',
  templateUrl: './tipo-ejercicio-add.component.html',
  styleUrls: ['./tipo-ejercicio-add.component.css']
})
export class TipoEjercicioAddComponent implements OnInit {

  nuevoTipoEjercicio : any;

  constructor(private _service : TipoEjercicioServiceService,private _router:Router) {
    this.nuevoTipoEjercicio = {
      nombre:''
    }
   }

  ngOnInit(): void {
  }


  addTipoEjercicio(){
    this._service.createTipoEjercicio(this.nuevoTipoEjercicio).subscribe(data=>{
      alert("Tipo De Ejercicio Creado");
      window.location.reload();
    })
  }
}
