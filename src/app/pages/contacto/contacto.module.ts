import { NgModule } from '@angular/core';
import { PageContactoComponent } from './pages/contacto/contacto.component';
import { ContenidoComponent } from './components/contenido/contenido.component';

import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PageContactoComponent, ContenidoComponent],
  imports: [
    SharedModule
  ],
  exports: [PageContactoComponent]
})
export class ContactoModule { }
