import { Component, OnInit } from '@angular/core';
import { ContactoUsuario } from '@shared/models/contacto.usuario';
import { MapaComponent } from '@shared/components/mapa/mapa.component';

@Component({
  selector: 'contacto-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {
  public mensajeUsuario: ContactoUsuario;
  public mapHeight: number;
  constructor() { 
    this.mensajeUsuario = new ContactoUsuario('','','','','');
    this.mapHeight = 300;
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    console.log(this.mensajeUsuario);
  }

}
