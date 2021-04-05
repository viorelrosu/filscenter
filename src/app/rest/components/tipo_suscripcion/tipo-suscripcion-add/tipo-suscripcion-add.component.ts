import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoSuscripcionServiceService } from '@servicesRest/tipo_suscripcion/tipo-suscripcion-service.service';

@Component({
  selector: 'app-tipo-suscripcion-add',
  templateUrl: './tipo-suscripcion-add.component.html',
  styleUrls: ['./tipo-suscripcion-add.component.css']
})
export class TipoSuscripcionAddComponent implements OnInit {
  nuevoTipoSuscripcion:any;
  constructor(private _service:TipoSuscripcionServiceService, private _router:Router) {
    this.nuevoTipoSuscripcion={

    }
  }

  ngOnInit(): void {
  }

  addTipoSuscripcion(){
    this._service.createTipoSuscripcion(this.nuevoTipoSuscripcion).subscribe((data)=>{
      alert("Tipo de Suscripción creada");
      window.location.reload();
    })
  }
}
