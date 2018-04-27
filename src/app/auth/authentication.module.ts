import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationGuard } from './authorization.guard';
import { AuthInterceptor } from './auth-interceptor';
import {
  AuthModule,
  OidcSecurityService,
  OpenIDImplicitFlowConfiguration,
  OidcConfigService,
  AuthWellKnownEndpoints
} from 'angular-auth-oidc-client';
import { ConfigService } from './../shared/services/configservice/config.service';
import { StoreModule } from '@ngrx/store';
import { AuthReducerFeature } from './reducers/auth';
import { reducer } from './reducers/auth';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';

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
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (oidcConfigService: OidcConfigService, configService: ConfigService ) => (
        () => { if (oidcConfigService != null) { oidcConfigService.load_using_stsServer(configService.AUTH_URL()); } }),
      deps: [OidcConfigService, ConfigService],
      multi: true
    }

  ]
})
export class AuthenticationModule {

  constructor( private oidcSecurityService: OidcSecurityService,
              private configService: ConfigService,
              private oidcConfigService: OidcConfigService) {

    if (this.oidcConfigService != null) {
      this.oidcConfigService.onConfigurationLoaded.subscribe(() => this.setupAuthentication());
    }

  }


  private setupAuthentication() {
    if (this.oidcConfigService != null && this.oidcConfigService.wellKnownEndpoints != null) {
      const authWellKnownEndpoints = new AuthWellKnownEndpoints();
      authWellKnownEndpoints.setWellKnownEndpoints(this.oidcConfigService.wellKnownEndpoints);
      this.oidcSecurityService.setupModule(this.getSecurityConfig(this.configService), authWellKnownEndpoints);
    }
  }

  private getSecurityConfig(configService: ConfigService) {
    const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
    openIDImplicitFlowConfiguration.stsServer = configService.STS_AUTH_URL;

    openIDImplicitFlowConfiguration.redirect_url = configService.UI_HOST_URL;
    // // The Client MUST validate that the aud (audience) Claim contains its client_id value registered at the Issuer identified
    // // by the iss (issuer) Claim as an audience.
    // // The ID Token MUST be rejected if the ID Token does not list the Client as a valid audience, or if it contains additional
    // // audiences not trusted by the Client.
    openIDImplicitFlowConfiguration.client_id = 'esw.logistics.shippingrates.ui.spa';
    openIDImplicitFlowConfiguration.response_type = 'id_token token';
    openIDImplicitFlowConfiguration.scope = 'openid logistics.shippingcalculator.api.all profile';
    openIDImplicitFlowConfiguration.post_logout_redirect_uri = configService.UI_HOST_URL;
    openIDImplicitFlowConfiguration.start_checksession = true;
    openIDImplicitFlowConfiguration.silent_renew = true;
    openIDImplicitFlowConfiguration.post_login_route = '/';
    // // HTTP 403
    openIDImplicitFlowConfiguration.forbidden_route = '/forbidden';
    // // HTTP 401
    openIDImplicitFlowConfiguration.unauthorized_route = '/unauthorized';
    openIDImplicitFlowConfiguration.log_console_warning_active = true;
    openIDImplicitFlowConfiguration.log_console_debug_active = false;
    // // id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
    // // limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specific.
    openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 300;
    openIDImplicitFlowConfiguration.storage = sessionStorage;

    return openIDImplicitFlowConfiguration;
  }

}
