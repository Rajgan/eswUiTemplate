import { UserProfile } from './userprofile.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { filter, map, tap } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class AuthContext {

  private _isAuthenticated = false;

  public get userInfo$(): Observable<UserProfile> {
    return this.oidcSecurityService.getUserData()
      .pipe(

        filter( userData => !!userData),
        map(
          userData => <UserProfile>{  Email: userData.name[0] || '',
            Name: userData.name[1] || '',
            FamilyName: userData.family_name || '',
            GivenName: userData.given_name || ''
          }
        )
    );
  }

  public get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  public get isAuthenticated$(): Observable <boolean> {
    return this.oidcSecurityService.getIsAuthorized();
  }

  public logoff() {
    this.oidcSecurityService.logoff();
  }

  public logIn() {
    if (!this.isAuthenticated) {
      this.oidcSecurityService.authorize();
    }
  }

  public getAuthenticationHeaderValue(url): string {
    if (this.isAuthenticated) {
      return `Bearer ${this.oidcSecurityService.getToken()}`;
    }
    return null;
  }

  public getRoles(): Array<string> {
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

  constructor(private oidcSecurityService: OidcSecurityService) {
    this.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this._isAuthenticated = isAuthenticated;
      }
    );
  }

}
