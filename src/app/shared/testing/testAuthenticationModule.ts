import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  AuthModule,
  OidcSecurityService,
  OpenIDImplicitFlowConfiguration,
  OidcConfigService,
  AuthWellKnownEndpoints
} from 'angular-auth-oidc-client';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../auth/effects/auth.effects';
import { ConfigService } from '../services/configservice/config.service';
import { AuthReducerFeature, reducer } from '../../auth/reducers/auth';
import { AuthorizationGuard } from '../../auth/authorization.guard';

@NgModule({
  declarations: [],
  imports: [
    AuthModule.forRoot(),
    StoreModule.forFeature(AuthReducerFeature, reducer),
    EffectsModule.forFeature( [AuthEffects])
  ],
  providers: [
    ConfigService,
    AuthorizationGuard,
    OidcSecurityService,
    OidcConfigService

  ]
})
export class TestAuthenticationModule { }
