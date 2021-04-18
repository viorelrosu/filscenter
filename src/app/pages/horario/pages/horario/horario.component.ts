import { Component, DoCheck, OnInit } from '@angular/core';
import { TablaComponent } from '../../componentes/tabla/tabla.component';
import { TimelineComponent } from '../../componentes/timeline/timeline.component'; 

declare var $:any;
@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class PageHorarioComponent implements OnInit, DoCheck {

  public pageTitle: string;
  public pageDesc: string;
  public pageImg: string;
  public filters: any;

  constructor() {
    this.pageTitle = 'Horario Clases Semanal';
    this.pageDesc = 'Las clases que tenemos programadas';
    this.pageImg = 'clase.jpg';
    this.filters = {
      'type': 'tabla',
      'actividad': '',
      'monitor': ''
    };
    
  }

  ngOnInit(): void {
    $('#modalClase').appendTo("body");
  }

  openModalClase(index: number, hora: string) :void {
    var modal = $('#modalClase');
    var claseMonitor = $('#modalClase').find('.monitor-nombre');
    var claseTitle = $('#modalClase').find('.modal-title');
    //claseTitle.html('Body Combat | ' + hora);
    //claseMonitor.html('Victor Loda');
    $('#modalClase').modal('show');
  }

  ngDoCheck() {
    //console.log(this.filters.type);
  }

}
