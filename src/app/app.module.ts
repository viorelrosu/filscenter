import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// importamos los modulos
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { PagesModule } from './pages/pages.module';
import { RestModule } from './rest/rest.module';
import { CuentaModule } from './cuenta/cuenta.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as $ from '../../src/assets/js/jquery';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    PagesModule,
    RestModule,
    CuentaModule,
    NgbModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
