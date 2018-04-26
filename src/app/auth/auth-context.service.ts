import { UserProfile } from './userprofile.model';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Store } from '@ngrx/store';
import { Authorized } from './actions/auth';
import { AuthState } from './reducers/auth';

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

  constructor(private oidcSecurityService: OidcSecurityService,
              private store: Store<AuthState>) {
    this.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this._isAuthenticated = isAuthenticated;
        if (isAuthenticated) {
          this.store.dispatch(new Authorized());
        }
      }
    );
  }

}
