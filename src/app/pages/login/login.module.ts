import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { PageLoginComponent } from './pages/login/login.component';
import { FormularioComponent } from './components/formulario/formulario.component';

@NgModule({
  declarations: [PageLoginComponent, FormularioComponent],
  imports: [
    SharedModule
  ],
  exports: [PageLoginComponent]
})
export class LoginModule { }
