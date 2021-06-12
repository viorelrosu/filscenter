import { NgModule } from "@angular/core";
import { DatePipe } from '@angular/common';
import { DataTablesModule } from "angular-datatables";

//imports componentes
import { SharedModule } from "@shared/shared.module";
import { ActividadAddComponent } from "@componentsRest/actividad/actividad-add/actividad-add.component";
import { ActividadListComponent } from "@componentsRest/actividad/actividad-list/actividad-list.component";
import { DireccionAddComponent } from "@componentsRest/direccion/direccion-add/direccion-add.component";
import { DireccionListComponent } from "@componentsRest/direccion/direccion-list/direccion-list.component";
import { EjercicioAddComponent } from "@componentsRest/ejercicio/ejercicio-add/ejercicio-add.component";
import { EjercicioListComponent } from "@componentsRest/ejercicio/ejercicio-list/ejercicio-list.component";
import { EjercicioSerieAddComponent } from "@componentsRest/ejercicio_serie/ejercicio-serie-add/ejercicio-serie-add.component";
import { EjercicioSerieListComponent } from "@componentsRest/ejercicio_serie/ejercicio-serie-list/ejercicio-serie-list.component";
import { FacturaAddComponent } from "@componentsRest/factura/factura-add/factura-add.component";
import { FacturaListComponent } from "@componentsRest/factura/factura-list/factura-list.component";
import { LocalidadAddComponent } from "@componentsRest/localidad/localidad-add/localidad-add.component";
import { LocalidadListComponent } from "@componentsRest/localidad/localidad-list/localidad-list.component";
import { ProvinciaAddComponent } from "@componentsRest/provincia/provincia-add/provincia-add.component";
import { ProvinciaListComponent } from "@componentsRest/provincia/provincia-list/provincia-list.component";
import { ReservaAddComponent } from "@componentsRest/reserva/reserva-add/reserva-add.component";
import { ReservaListComponent } from "@componentsRest/reserva/reserva-list/reserva-list.component";
import { RolAddComponent } from "@componentsRest/rol/rol-add/rol-add.component";
import { RolListComponent } from "@componentsRest/rol/rol-list/rol-list.component";
import { SalaAddComponent } from "@componentsRest/sala/sala-add/sala-add.component";
import { SalaListComponent } from "@componentsRest/sala/sala-list/sala-list.component";
import { SlotAddComponent } from "@componentsRest/slot/slot-add/slot-add.component";
import { SlotListComponent } from "@componentsRest/slot/slot-list/slot-list.component";
import { SuscripcionAddComponent } from "@componentsRest/suscripcion/suscripcion-add/suscripcion-add.component";
import { SuscripcionListComponent } from "@componentsRest/suscripcion/suscripcion-list/suscripcion-list.component";
import { TaquillaAddComponent } from "@componentsRest/taquilla/taquilla-add/taquilla-add.component";
import { TaquillaListComponent } from "@componentsRest/taquilla/taquilla-list/taquilla-list.component";
import { TipoActividadAddComponent } from "@componentsRest/tipo_actividad/tipo-actividad-add/tipo-actividad-add.component";
import { TipoActividadListComponent } from "@componentsRest/tipo_actividad/tipo-actividad-list/tipo-actividad-list.component";
import { TipoEjercicioAddComponent } from "@componentsRest/tipo_ejercicio/tipo-ejercicio-add/tipo-ejercicio-add.component";
import { TipoEjercicioListComponent } from "@componentsRest/tipo_ejercicio/tipo-ejercicio-list/tipo-ejercicio-list.component";
import { TipoSuscripcionAddComponent } from "@componentsRest/tipo_suscripcion/tipo-suscripcion-add/tipo-suscripcion-add.component";
import { TipoSuscripcionListComponent } from "@componentsRest/tipo_suscripcion/tipo-suscripcion-list/tipo-suscripcion-list.component";
import { UsuarioAddComponent } from "@componentsRest/usuario/usuario-add/usuario-add.component";
import { UsuarioListComponent } from "@componentsRest/usuario/usuario-list/usuario-list.component";
import { TablaEjercicioAddComponent } from "@componentsRest/tabla_ejercicio/tabla-ejercicio-add/tabla-ejercicio-add.component";
import { TablaEjercicioListComponent } from "@componentsRest/tabla_ejercicio/tabla-ejercicio-list/tabla-ejercicio-list.component";

//imports pipes
import { FormatoHoraPipe } from "./pipes/formatoHora.pipe";

@NgModule({
  declarations: [
    TipoEjercicioListComponent,
    TipoActividadAddComponent,
    ActividadListComponent,
    ActividadAddComponent,
    DireccionListComponent,
    DireccionAddComponent,
    ProvinciaListComponent,
    ProvinciaAddComponent,
    LocalidadListComponent,
    LocalidadAddComponent,
    SuscripcionAddComponent,
    SalaListComponent,
    SalaAddComponent,
    TaquillaListComponent,
    TaquillaAddComponent,
    RolListComponent,
    RolAddComponent,
    TipoEjercicioListComponent,
    TipoEjercicioAddComponent,
    EjercicioListComponent,
    EjercicioAddComponent,
    SuscripcionListComponent,
    SuscripcionAddComponent,
    TipoSuscripcionListComponent,
    TipoSuscripcionAddComponent,
    UsuarioListComponent,
    UsuarioAddComponent,
    FacturaListComponent,
    FacturaAddComponent,
    ReservaListComponent,
    ReservaAddComponent,
    FormatoHoraPipe,
    SlotListComponent,
    SlotAddComponent,
    EjercicioSerieListComponent,
    EjercicioSerieAddComponent,
    TablaEjercicioListComponent,
    TablaEjercicioAddComponent,
    TipoActividadListComponent,
  ],
  imports: [SharedModule,DataTablesModule],
  providers: [DatePipe]
})
export class RestModule {}
