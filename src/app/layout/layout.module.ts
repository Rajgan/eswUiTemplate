import { AuthenticationModule } from './../auth/authentication.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule } from '@angular/router';
import { createTranslateLoader } from '../shared/utils/translationLoader';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({ loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] } }),
    RouterModule,
    AuthenticationModule
  ],
  declarations: [
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
