import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MissingTranslationHandler,
  MissingTranslationHandlerParams,
  TranslateLoader,
  TranslateModule,
  TranslateCompiler } from '@ngx-translate/core';
import { environment } from '../environments/environment';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SharedServicesModule } from './shared/services/shared-services.module';
import { SharedUiModule } from './shared/ui/shared-ui.module';
import { createTranslateLoader } from './shared/utils/translationLoader';
import { PreferencesComponent } from './preferences/preferences.component';
import { AuthModule } from 'angular-auth-oidc-client';
import { AuthenticationModule } from './auth/authentication.module';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export class EswMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return `$${params.key}$`;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    PreferencesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: (createTranslateLoader), deps: [HttpClient] },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: EswMissingTranslationHandler },
      useDefaultLang: false
    }),
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot(),
    LayoutModule,          // this is the layout module. Header, footer, breadcrumb.  Any layout components should be added here
    ModalModule.forRoot(),
    AppRoutingModule,      // this is the top routing module, it has lazy loaded and eager loaded modules for features
    SharedServicesModule,  // add your services in here
    SharedUiModule,         // add any shared ui components in here
    AuthenticationModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
