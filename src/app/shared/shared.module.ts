import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PagetitleComponent } from './components/pagetitle/pagetitle.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { PortfolioItemComponent } from './components/portfolio-item/portfolio-item.component';
import { TeamMemberComponent } from './components/team-member/team-member.component';
import { CallToActionComponent } from './components/call-to-action/call-to-action.component';
import { PlanesSuscripcionComponent } from './components/planes-suscripcion/planes-suscripcion.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { ServicioComponent } from './components/servicio/servicio.component';

import { FormatoStringToHoraPipe } from "./pipes/formatoStringToHora.pipe";

@NgModule({
  declarations: [
    PagetitleComponent,
    MapaComponent,
    PortfolioItemComponent,
    TeamMemberComponent,
    CallToActionComponent,
    PlanesSuscripcionComponent,
    ActividadComponent,
    ServicioComponent,
    FormatoStringToHoraPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PagetitleComponent,
    MapaComponent,
    CommonModule,
    FormsModule,
    PortfolioItemComponent,
    TeamMemberComponent,
    CallToActionComponent,
    PlanesSuscripcionComponent,
    ServicioComponent,
    FormatoStringToHoraPipe
  ]
})
export class SharedModule { }
