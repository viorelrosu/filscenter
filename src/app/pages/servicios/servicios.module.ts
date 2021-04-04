import { NgModule } from '@angular/core';
import { PageServiciosComponent } from './pages/servicios/servicios.component';

import { SharedModule } from '@shared/shared.module';
import { AllServiciosComponent } from './components/all-servicios/all-servicios.component';

@NgModule({
  declarations: [PageServiciosComponent, AllServiciosComponent],
  imports: [
    SharedModule
  ],
  exports: [PageServiciosComponent]
})
export class ServiciosModule { }
