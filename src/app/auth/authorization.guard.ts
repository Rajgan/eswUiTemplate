import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthContext } from './auth-context.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(private router: Router,
                private authService: AuthContext) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return (this.authService.isAuthenticated);
    }
}

