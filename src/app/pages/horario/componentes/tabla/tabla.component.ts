import { Component, OnInit, Input } from '@angular/core';
declare var $:any;
@Component({
  selector: 'horario-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent implements OnInit {

  constructor(
  ) { }

  @Input() openModalClase: (index: number, tabla: string) => void;

  ngOnInit(): void {
    //$('#myModal').modal('show');
  }

}
