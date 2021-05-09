import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PageHorarioComponent } from './pages/horario/horario.component';
import { TimelineComponent } from './componentes/timeline/timeline.component';
import { TablaComponent } from './componentes/tabla/tabla.component';

@NgModule({
  declarations: [PageHorarioComponent, TimelineComponent, TablaComponent],
  imports: [
    SharedModule
  ],
  exports: [PageHorarioComponent, TablaComponent]
})
export class HorarioModule { }
