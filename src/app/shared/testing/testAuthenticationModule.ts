import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  AuthModule,
  OidcSecurityService,
  OpenIDImplicitFlowConfiguration,
  OidcConfigService,
  AuthWellKnownEndpoints
} from 'angular-auth-oidc-client';
import { ConfigService } from '../services/configservice/config.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthContext } from '../../auth/auth-context.service';

@NgModule({
  declarations: [],
  imports: [
    AuthModule.forRoot(),
  ],
  providers: [
    ConfigService,
    AuthorizationGuard,
    OidcSecurityService,
    OidcConfigService,
    AuthContext

  ]
})
export class TestAuthenticationModule { }