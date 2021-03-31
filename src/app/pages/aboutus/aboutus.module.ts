import { NgModule } from '@angular/core';
import { PageAboutusComponent } from './pages/aboutus/aboutus.component';

import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PageAboutusComponent],
  imports: [
    SharedModule
  ],
  exports: [PageAboutusComponent]
})
export class AboutusModule { }
