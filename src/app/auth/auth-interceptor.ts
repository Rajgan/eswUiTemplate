import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ConfigService } from '../shared/services/configservice/config.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private oidcSecurityService: OidcSecurityService;

    constructor(private injector: Injector, private config: ConfigService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let requestToForward = req;

        if (this.oidcSecurityService === undefined) {
            this.oidcSecurityService = this.injector.get(OidcSecurityService);
        }
        if (this.oidcSecurityService !== undefined) {
            const token = this.oidcSecurityService.getToken();
            if (token !== '' && (this.isAuthenticatedUrl(req.url))) {
                const tokenValue = 'Bearer ' + token;
                requestToForward = req.clone({ setHeaders: { 'Authorization': tokenValue } });
            }
        } else {
            console.log('OidcSecurityService undefined: NO auth header!');
        }

        return next.handle(requestToForward);
    }

    public isAuthenticatedUrl(url: string): boolean {
      if (url.indexOf(this.config.UI_API_URL.url) > -1) {
        return this.config.UI_API_URL.isAuthenticatedUrl;
      }

      if (url.indexOf(this.config.STS_AUTH_URL.url) > -1) {
        return this.config.STS_AUTH_URL.isAuthenticatedUrl;
      }

      return false;
    }
}
