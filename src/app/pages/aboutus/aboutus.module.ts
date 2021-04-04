import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PageAboutusComponent } from './pages/aboutus/aboutus.component';

import * as aboutusComponents from './components';

@NgModule({
  declarations: [
    PageAboutusComponent,
    ...aboutusComponents.components,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    PageAboutusComponent,
    ...aboutusComponents.components
  ]
})
export class AboutusModule { }
