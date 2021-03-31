import { NgModule } from '@angular/core';
import { PageServiciosComponent } from './pages/servicios/servicios.component';

import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PageServiciosComponent],
  imports: [
    SharedModule
  ],
  exports: [PageServiciosComponent]
})
export class ServiciosModule { }
