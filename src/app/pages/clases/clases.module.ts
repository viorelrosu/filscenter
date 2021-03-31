import { NgModule } from '@angular/core';
import { PageClasesComponent } from './pages/clases/clases.component';

import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PageClasesComponent],
  imports: [
    SharedModule
  ],
  exports: [PageClasesComponent]
})
export class ClasesModule { }
