import { Component, OnInit } from '@angular/core';

import { HomeSliderComponent } from '../../components/slider/slider.component';
import { HomeClasesComponent } from '../../components/clases/clases.component';
import { HomeTheGymComponent } from '../../components/thegym/thegym.component';
import { HomeHorarioComponent } from '../../components/horario/horario.component';
import { HomeGaleriaComponent } from '../../components/galeria/galeria.component';
import { HomeGoalsComponent } from '../../components/goals/goals.component';
import { HomeMonitorsComponent } from '../../components/monitors/monitors.component';
import { HomeMapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class PageHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
