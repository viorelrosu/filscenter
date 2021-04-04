import { NgModule } from '@angular/core';
import { PageClasesComponent } from './pages/clases/clases.component';

import { SharedModule } from '@shared/shared.module';
import { AllClasesComponent } from './components/all-clases/all-clases.component';

@NgModule({
  declarations: [PageClasesComponent, AllClasesComponent],
  imports: [
    SharedModule
  ],
  exports: [PageClasesComponent]
})
export class ClasesModule { }
