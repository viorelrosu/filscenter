import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TipoActividadListComponent } from "../rest/components/tipo_actividad/tipo-actividad-list/tipo-actividad-list.component";
import { PageCuentaPerfilComponent } from "./pages/perfil/perfil.component";
import { ActividadListComponent } from "@componentsRest/actividad/actividad-list/actividad-list.component";
import { DireccionListComponent } from "@componentsRest/direccion/direccion-list/direccion-list.component";
import { SlotListComponent } from "@componentsRest/slot/slot-list/slot-list.component";
import { UsuarioListComponent } from "@componentsRest/usuario/usuario-list/usuario-list.component";
import { RolListComponent } from "@componentsRest/rol/rol-list/rol-list.component";
import { TaquillaListComponent } from "@componentsRest/taquilla/taquilla-list/taquilla-list.component";
import { SuscripcionListComponent } from "@componentsRest/suscripcion/suscripcion-list/suscripcion-list.component";
import { ReservaListComponent } from "@componentsRest/reserva/reserva-list/reserva-list.component";
import { SalaListComponent } from "@componentsRest/sala/sala-list/sala-list.component";
import { TablaEjercicioListComponent } from "@componentsRest/tabla_ejercicio/tabla-ejercicio-list/tabla-ejercicio-list.component";
import { EjercicioSerieListComponent } from "@componentsRest/ejercicio_serie/ejercicio-serie-list/ejercicio-serie-list.component";
import { EjercicioListComponent } from "@componentsRest/ejercicio/ejercicio-list/ejercicio-list.component";
import { FacturaListComponent } from "@componentsRest/factura/factura-list/factura-list.component";

const routes: Routes = [
  {
    path: "",
    component: PageCuentaPerfilComponent,
    children: [
      // config usuarios
      {
        path: "usuario/list",
        component: UsuarioListComponent,
      },
      {
        path: "rol/list",
        component: RolListComponent,
      },
      {
        path: "taquilla/list",
        component: TaquillaListComponent,
      },
      {
        path: "direccion/list",
        component: DireccionListComponent,
      },
      {
        path: "suscripcion/list",
        component: SuscripcionListComponent,
      },
      //config actividades/reservas
      
      {
        path: "actividad/list",
        component: ActividadListComponent,
      },
      {
        path: "tipo_actividad/list",
        component: TipoActividadListComponent,
      },
      {
        path: "slot/list",
        component: SlotListComponent,
      },
      {
        path: "reserva/list",
        component: ReservaListComponent,
      },
      {
        path: "sala/list",
        component: SalaListComponent,
      },
      //config tablas
      {
        path: "tablaEjercicio/list",
        component: TablaEjercicioListComponent,
      },
      {
        path: "ejercicioSerie/list",
        component: EjercicioSerieListComponent,
      },
      {
        path: "ejercicio/list",
        component: EjercicioListComponent,
      },
      //otros
      {
        path: "factura/list",
        component: FacturaListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CuentaRoutingModule {}
