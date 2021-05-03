import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PagePoliticaComponent } from './pages/politica/politica.component';
import { PageCookiesComponent } from './pages/cookies/cookies.component';
import { PageLegalComponent } from './pages/legal/legal.component';



@NgModule({
  declarations: [PagePoliticaComponent, PageCookiesComponent, PageLegalComponent],
  imports: [
    SharedModule
  ],
  exports: [PagePoliticaComponent, PageCookiesComponent, PageLegalComponent],
})
export class PrivacidadModule { }
