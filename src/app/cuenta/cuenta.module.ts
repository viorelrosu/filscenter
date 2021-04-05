import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PagePerfilComponent } from './pages/perfil/perfil.component';
import { MenuComponent } from './components/menu/menu.component';
import { CuentaRoutingModule } from './cuenta-routing.module';




@NgModule({
  declarations: [PagePerfilComponent, MenuComponent],
  imports: [
    SharedModule,
    CuentaRoutingModule,
  ],
  exports: [PagePerfilComponent,CuentaRoutingModule]
})
export class CuentaModule { }
