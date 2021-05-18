import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//importar componentes
import { PageHomeComponent } from "./pages/home/pages/home/home.component";
import { PageAboutusComponent } from "./pages/aboutus/pages/aboutus/aboutus.component";
import { PageServiciosComponent } from "./pages/servicios/pages/servicios/servicios.component";
import { PageHorarioComponent } from "./pages/horario/pages/horario/horario.component";
import { PageClasesComponent } from "./pages/clases/pages/clases/clases.component";
import { PageContactoComponent } from "./pages/contacto/pages/contacto/contacto.component";

import { PageLoginComponent } from "./pages/login/pages/login/login.component";
import { PageSignupComponent } from "./pages/signup/pages/signup/signup.component";
import { PageRecoverComponent } from "./pages/recover/pages/recover/recover.component";
import { PagePoliticaComponent } from "./pages/privacidad/pages/politica/politica.component";
import { PageCookiesComponent } from "./pages/privacidad/pages/cookies/cookies.component";
import { PageLegalComponent } from "./pages/privacidad/pages/legal/legal.component";

import { PageCuentaPerfilComponent } from "./cuenta/pages/perfil/perfil.component";
import { PageCuentaInicioComponent } from "./cuenta/components/inicio/inicio.component";
import { PageCuentaDatosComponent } from "./cuenta/components/datos/datos.component";
import { PageCuentaFacturasComponent } from "./cuenta/components/facturas/facturas.component";

import { TipoActividadListComponent } from "./rest/components/tipo_actividad/tipo-actividad-list/tipo-actividad-list.component";
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
  { path: "", component: PageHomeComponent },
  { path: "inicio", component: PageHomeComponent },
  { path: "quienes-somos", component: PageAboutusComponent },
  { path: "clases", component: PageClasesComponent },
  { path: "servicios", component: PageServiciosComponent },
  { path: "horario", component: PageHorarioComponent },
  { path: "contacto", component: PageContactoComponent },
  { path: "iniciar-sesion", component: PageLoginComponent },
  { path: "registro", component: PageSignupComponent },
  { path: "recuperar-pass", component: PageRecoverComponent },
  { path: "politica-privacidad", component: PagePoliticaComponent },
  { path: "cookies", component: PageCookiesComponent },
  { path: "aviso-legal", component: PageLegalComponent },
  {
    path: "cuenta",
    component: PageCuentaPerfilComponent,
    children: [
      {
        path: "inicio",
        component: PageCuentaInicioComponent,
      },
      {
        path: "mis/datos",
        component: PageCuentaDatosComponent,
      },
      {
        path: "mis/facturas",
        component: PageCuentaFacturasComponent,
      },
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
  //{ path: 'cuenta', component : PagePerfilComponent, loadChildren: () => import('./cuenta/cuenta.module').then(m => m.CuentaModule) },
  { path: "**", component: PageHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
