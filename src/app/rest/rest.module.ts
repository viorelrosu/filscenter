import { NgModule } from "@angular/core";

//imports componentes
import { SharedModule } from "@shared/shared.module";
import { ActividadAddComponent } from "./components/actividad/actividad-add/actividad-add.component";
import { ActividadListComponent } from "./components/actividad/actividad-list/actividad-list.component";
import { DireccionAddComponent } from "./components/direccion/direccion-add/direccion-add.component";
import { DireccionListComponent } from "./components/direccion/direccion-list/direccion-list.component";
import { EjercicioAddComponent } from "./components/ejercicio/ejercicio-add/ejercicio-add.component";
import { EjercicioListComponent } from "./components/ejercicio/ejercicio-list/ejercicio-list.component";
import { EjercicioSerieAddComponent } from "./components/ejercicio_serie/ejercicio-serie-add/ejercicio-serie-add.component";
import { EjercicioSerieListComponent } from "./components/ejercicio_serie/ejercicio-serie-list/ejercicio-serie-list.component";
import { FacturaAddComponent } from "./components/factura/factura-add/factura-add.component";
import { FacturaListComponent } from "./components/factura/factura-list/factura-list.component";
import { LocalidadAddComponent } from "./components/localidad/localidad-add/localidad-add.component";
import { LocalidadListComponent } from "./components/localidad/localidad-list/localidad-list.component";
import { ProvinciaAddComponent } from "./components/provincia/provincia-add/provincia-add.component";
import { ProvinciaListComponent } from "./components/provincia/provincia-list/provincia-list.component";
import { ReservaAddComponent } from "./components/reserva/reserva-add/reserva-add.component";
import { ReservaListComponent } from "./components/reserva/reserva-list/reserva-list.component";
import { RolAddComponent } from "./components/rol/rol-add/rol-add.component";
import { RolListComponent } from "./components/rol/rol-list/rol-list.component";
import { SalaAddComponent } from "./components/sala/sala-add/sala-add.component";
import { SalaListComponent } from "./components/sala/sala-list/sala-list.component";
import { SlotAddComponent } from "./components/slot/slot-add/slot-add.component";
import { SlotListComponent } from "./components/slot/slot-list/slot-list.component";
import { SuscripcionAddComponent } from "./components/suscripcion/suscripcion-add/suscripcion-add.component";
import { SuscripcionListComponent } from "./components/suscripcion/suscripcion-list/suscripcion-list.component";
import { TaquillaAddComponent } from "./components/taquilla/taquilla-add/taquilla-add.component";
import { TaquillaListComponent } from "./components/taquilla/taquilla-list/taquilla-list.component";
import { TipoActividadAddComponent } from "./components/tipo_actividad/tipo-actividad-add/tipo-actividad-add.component";
import { TipoActividadListComponent } from "./components/tipo_actividad/tipo-actividad-list/tipo-actividad-list.component";
import { TipoEjercicioAddComponent } from "./components/tipo_ejercicio/tipo-ejercicio-add/tipo-ejercicio-add.component";
import { TipoEjercicioListComponent } from "./components/tipo_ejercicio/tipo-ejercicio-list/tipo-ejercicio-list.component";
import { TipoSuscripcionAddComponent } from "./components/tipo_suscripcion/tipo-suscripcion-add/tipo-suscripcion-add.component";
import { TipoSuscripcionListComponent } from "./components/tipo_suscripcion/tipo-suscripcion-list/tipo-suscripcion-list.component";
import { UsuarioAddComponent } from "./components/usuario/usuario-add/usuario-add.component";
import { UsuarioListComponent } from "./components/usuario/usuario-list/usuario-list.component";
import { TablaEjercicioAddComponent } from "@componentsRest/tabla_ejercicio/tabla-ejercicio-add/tabla-ejercicio-add.component";
import { TablaEjercicioListComponent } from "@componentsRest/tabla_ejercicio/tabla-ejercicio-list/tabla-ejercicio-list.component";


//imports pipes
import { FormatoHoraPipe } from "./pipes/formatoHora.pipe";
import { TipoActividadUpdateComponent } from "@componentsRest/tipo_actividad/tipo-actividad-update/tipo-actividad-update.component";



@NgModule({
  declarations: [ 
    TipoActividadListComponent,
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
    TipoActividadUpdateComponent
  ],
  imports: [SharedModule],
})
export class RestModule {}
