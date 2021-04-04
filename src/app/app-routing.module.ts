import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//importar componentes
import { PageHomeComponent } from './pages/home/pages/home/home.component';
import { PageAboutusComponent } from './pages/aboutus/pages/aboutus/aboutus.component';
import { PageServiciosComponent } from './pages/servicios/pages/servicios/servicios.component';
import { PageClasesComponent } from './pages/clases/pages/clases/clases.component';
import { PageHorarioComponent } from './pages/horario/pages/horario/horario.component';
import { PageContactoComponent } from './pages/contacto/pages/contacto/contacto.component';

import { PageLoginComponent } from './pages/login/pages/login/login.component';
import { PageSignupComponent } from './pages/signup/pages/signup/signup.component';
import { PageRecoverComponent } from './pages/recover/pages/recover/recover.component';
import { PagePerfilComponent } from './cuenta/pages/perfil/perfil.component';

const routes: Routes = [
  {path: '', component: PageHomeComponent },
  {path: 'inicio', component: PageHomeComponent },
  {path: 'quienes-somos', component: PageAboutusComponent },
  {path: 'clases', component: PageClasesComponent },
  {path: 'servicios', component: PageServiciosComponent },
  {path: 'horario', component: PageHorarioComponent },
  {path: 'contacto', component: PageContactoComponent },
  {path: 'iniciar-sesion', component: PageLoginComponent },
  {path: 'registro', component: PageSignupComponent },
  {path: 'recuperar-pass', component: PageRecoverComponent },
  {path: 'cuenta', component: PagePerfilComponent },
  {path: '**', component: PageHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
