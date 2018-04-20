import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ConfigService } from './../shared/services/configservice/config.service';
import { UserProfileService } from './userprofile.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor( private router: Router, private userProfileService: UserProfileService, private configService: ConfigService) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return (this.userProfileService.isAuthorized);
    }
}
