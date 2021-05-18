import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { PageCuentaPerfilComponent } from './pages/perfil/perfil.component';
import { MenuComponent } from './components/menu/menu.component';
import { CuentaRoutingModule } from './cuenta-routing.module';
import { PageCuentaDatosComponent } from './components/datos/datos.component';
import { PageCuentaInicioComponent } from './components/inicio/inicio.component';
import { CuentaInicioHorarioComponent } from './components/inicio-horario/inicio-horario.component';
import { CuentaInicioTablasComponent } from './components/inicio-tablas/inicio-tablas.component';
import { CuentaUploadImageComponent } from './components/upload-image/upload-image.component';
import { PageCuentaFacturasComponent } from './components/facturas/facturas.component';

@NgModule({
  declarations: [
    PageCuentaPerfilComponent,
    MenuComponent,
    PageCuentaDatosComponent,
    PageCuentaInicioComponent,
    CuentaInicioHorarioComponent,
    CuentaInicioTablasComponent,
    CuentaUploadImageComponent,
    PageCuentaFacturasComponent
  ],
  imports: [
    SharedModule,
    CuentaRoutingModule,
  ],
  exports: [PageCuentaPerfilComponent, CuentaRoutingModule, PageCuentaDatosComponent, PageCuentaFacturasComponent, PageCuentaInicioComponent],
  providers: [DatePipe]
})
export class CuentaModule { }
