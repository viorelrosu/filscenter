import { NgModule } from '@angular/core';
import { PageSignupComponent } from './pages/signup/signup.component';
import { FormularioComponent } from './components/formulario/formulario.component';

import { SharedModule } from '@shared/shared.module';
@NgModule({
  declarations: [PageSignupComponent, FormularioComponent],
  imports: [
    SharedModule
  ],
  exports: [PageSignupComponent]
})
export class SignupModule { }
