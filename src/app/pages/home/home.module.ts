import { NgModule } from '@angular/core';
import { PageHomeComponent } from './pages/home/home.component';

import { HomeSliderComponent } from './components/slider/slider.component';
import { HomeClasesComponent } from './components/clases/clases.component';
import { HomeTheGymComponent } from './components/thegym/thegym.component';
import { HomeHorarioComponent } from './components/horario/horario.component';
import { HomeGaleriaComponent } from './components/galeria/galeria.component';
import { HomeGoalsComponent } from './components/goals/goals.component';
import { HomeMonitorsComponent } from './components/monitors/monitors.component';
import { HomeMapComponent } from './components/map/map.component';

import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    PageHomeComponent,
    HomeSliderComponent,
    HomeClasesComponent,
    HomeTheGymComponent,
    HomeHorarioComponent,
    HomeGaleriaComponent,
    HomeGoalsComponent,
    HomeMonitorsComponent,
    HomeMapComponent],
  imports: [
    SharedModule
  ],
  exports:[PageHomeComponent]
})
export class HomeModule { }
