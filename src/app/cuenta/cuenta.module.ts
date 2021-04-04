import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PagePerfilComponent } from './pages/perfil/perfil.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [PagePerfilComponent, MenuComponent],
  imports: [
    SharedModule
  ],
  exports: [PagePerfilComponent]
})
export class CuentaModule { }
