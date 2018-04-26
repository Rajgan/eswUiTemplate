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

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './reducers';

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
import { PreferencesEffects } from './preferences/effects/preferences.effects';

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
    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, { metaReducers }),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrument({
      name: 'NgRx Book Store DevTools',
      logOnly: environment.prod,
    }),

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot([PreferencesEffects]),
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
