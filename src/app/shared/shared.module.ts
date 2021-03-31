import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagetitleComponent } from './components/pagetitle/pagetitle.component';
import { MapaComponent } from './components/mapa/mapa.component';


@NgModule({
  declarations: [PagetitleComponent, MapaComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [PagetitleComponent, MapaComponent, CommonModule, FormsModule]
})
export class SharedModule { }
