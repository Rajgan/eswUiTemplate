import { Injectable } from '@angular/core';
import { ConfigService } from '../shared/services/configservice/config.service';
import {
  AuthModule,
  OidcSecurityService,
  OpenIDImplicitFlowConfiguration,
  OidcConfigService,
  AuthWellKnownEndpoints,
  AuthorizationResult
} from 'angular-auth-oidc-client';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserProfile } from './userprofile.model';

@Injectable()
export class UserProfileService {

  private _userprofile: UserProfile  = null;

  public get userProfile(): UserProfile {
    return this._userprofile;
  }
  public set userProfile(value) {
    this._userprofile = value;
    this._profileChange.next(value);
  }

  public userRoles: Array<string> = [];

  private isAuthorizedSubscription: Subscription;
  public get isAuthorized(): boolean {
    return this.userProfile != null;
  }
  private onChecksessionChanged: Subscription;


  private _profileChange: Subject<UserProfile> = new BehaviorSubject<UserProfile>(null);
  public userLoggedOn: Observable<UserProfile>;

  constructor(
    private oidcSecurityService: OidcSecurityService) {

    if (oidcSecurityService != null) {

      if (this.oidcSecurityService.moduleSetup) {
        this.doCallbackLogicIfRequired();
      } else {
        this.oidcSecurityService.onModuleSetup.subscribe(() => this.doCallbackLogicIfRequired());
      }

      this.oidcSecurityService.onCheckSessionChanged.subscribe( (checksession: boolean) => checksession = checksession);

      this.oidcSecurityService.onAuthorizationResult.subscribe((authorizationResult: AuthorizationResult) => {
        this.onAuthorizationResultComplete(authorizationResult); });

      this.isAuthorizedSubscription =
        this.oidcSecurityService.getIsAuthorized().subscribe((isAuthorized: boolean) => isAuthorized = isAuthorized);
    }

    this.userLoggedOn = this._profileChange.asObservable();
  }

  public login() {
    this.oidcSecurityService.authorize();
  }

  public logout() {
    this.oidcSecurityService.logoff();

    this.isAuthorizedSubscription.unsubscribe();
    /*
    this.oidcSecurityService.onModuleSetup.unsubscribe();
    this.oidcSecurityService.onCheckSessionChanged.unsubscribe();
    this.oidcSecurityService.onAuthorizationResult.unsubscribe();
    */
  }

  public hasRole(roleName: string): boolean {
    return (this.userRoles.indexOf(roleName) > -1);
  }

  private doCallbackLogicIfRequired() {
    if (window.location.hash) {
        this.oidcSecurityService.authorizedCallback();
    }
  }

  private onAuthorizationResultComplete(authorizationResult: AuthorizationResult) {
    if (authorizationResult === AuthorizationResult.unauthorized) {
        if (window.parent) {
            // sent from the child iframe, for example the silent renew
            window.parent.location.href = '/login';
        } else {
            // sent from the main window
            window.location.href = '/login';
        }
    } else {

      this.userRoles = this.processRoles(this.oidcSecurityService);

      this.oidcSecurityService.getUserData().subscribe((info) => {

        const user = new UserProfile();
        user.Email = info.preferred_username;
        user.FamilyName = info.family_name;
        user.GivenName = info.given_name;
        user.Name = info.name;
        user.Sub = info.sub;
        user.Language = localStorage.getItem('lang');

        this.userProfile = user;
      });
    }
  }

  private processRoles(oidcSecurityService: OidcSecurityService): Array<string> {

    const jwt = this.oidcSecurityService.getToken();
    const decodedJwtJsonData = window.atob(jwt.split('.')[1]);
    const decodedJwtData = JSON.parse(decodedJwtJsonData);
    const role = decodedJwtData.role;


    const roles: Array<string> = [];

    // TODO: handle multiple roles here...
    if (role !== null && role !== undefined) {
      roles.push(role);
    }

    return roles;
  }
}
