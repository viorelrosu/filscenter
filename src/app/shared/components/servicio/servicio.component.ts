import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  @Input() title: string;
  @Input() descr: string;
  @Input() icon: string;


  constructor() {
    this.title = 'Espacio';
    this.descr = '1400 m2 repartidos en dos plantas con las mejores instalaciones de la zona.';
    this.icon = 'fa fa-circle';
   }

  ngOnInit(): void {
  }

}
