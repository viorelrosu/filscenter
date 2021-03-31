import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopbarComponent } from './components/topbar/topbar.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, TopbarComponent],
  imports: [
    SharedModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [HeaderComponent,FooterComponent]
})
export class CoreModule { }
