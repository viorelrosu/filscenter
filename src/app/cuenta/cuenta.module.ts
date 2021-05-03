import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PageCuentaPerfilComponent } from './pages/perfil/perfil.component';
import { MenuComponent } from './components/menu/menu.component';
import { CuentaRoutingModule } from './cuenta-routing.module';
import { PageCuentaDatosComponent } from './components/datos/datos.component';
import { PageCuentaHorarioComponent } from './components/horario/horario.component';
import { PageCuentaInicioComponent } from './components/inicio/inicio.component';


@NgModule({
  declarations: [PageCuentaPerfilComponent, MenuComponent, PageCuentaDatosComponent, PageCuentaHorarioComponent, PageCuentaInicioComponent],
  imports: [
    SharedModule,
    CuentaRoutingModule,
  ],
  exports: [PageCuentaPerfilComponent, CuentaRoutingModule, PageCuentaDatosComponent, PageCuentaHorarioComponent, PageCuentaInicioComponent]
})
export class CuentaModule { }
