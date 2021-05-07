import { NgModule } from '@angular/core';

import { HomeModule } from './home/home.module';
import { AboutusModule } from './aboutus/aboutus.module';
import { ClasesModule } from './clases/clases.module';
import { ServiciosModule } from './servicios/servicios.module';
import { ContactoModule } from './contacto/contacto.module';
import { HorarioModule } from './horario/horario.module';
import { PrivacidadModule } from './privacidad/privacidad.module';

import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { RecoverModule } from './recover/recover.module';

import { FormatoHoraPipe } from "../rest/pipes/formatoHora.pipe";

@NgModule({
  declarations: [],
  imports: [
    HomeModule,
    AboutusModule,
    ClasesModule,
    ServiciosModule,
    ContactoModule,
    LoginModule,
    SignupModule,
    RecoverModule,
    HorarioModule,
    PrivacidadModule
  ]
})
export class PagesModule { }
