import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PageCuentaPerfilComponent } from './pages/perfil/perfil.component';
import { MenuComponent } from './components/menu/menu.component';
import { CuentaRoutingModule } from './cuenta-routing.module';
import { PageCuentaDatosComponent } from './components/datos/datos.component';
import { PageCuentaInicioComponent } from './components/inicio/inicio.component';
import { CuentaInicioHorarioComponent } from './components/inicio-horario/inicio-horario.component';

@NgModule({
  declarations: [
    PageCuentaPerfilComponent,
    MenuComponent,
    PageCuentaDatosComponent,
    PageCuentaInicioComponent,
    CuentaInicioHorarioComponent
  ],
  imports: [
    SharedModule,
    CuentaRoutingModule,
  ],
  exports: [PageCuentaPerfilComponent, CuentaRoutingModule, PageCuentaDatosComponent, PageCuentaInicioComponent]
})
export class CuentaModule { }
