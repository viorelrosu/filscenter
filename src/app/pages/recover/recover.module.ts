import { NgModule } from '@angular/core';

import { PageRecoverComponent } from './pages/recover/recover.component';
import { FormularioComponent } from './components/formulario/formulario.component';

import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PageRecoverComponent, FormularioComponent],
  imports: [
    SharedModule
  ],
  exports: [PageRecoverComponent]
})
export class RecoverModule { }
