import { UserProfile } from './userprofile.model';
import { async, inject, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OidcSecurityService } from 'angular-auth-oidc-client';

import { AuthContext } from './auth-context.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TestAuthenticationModule } from '../shared/testing/testAuthenticationModule';

describe('Service: AuthContextService', () => {
    let authContextService: AuthContext;
    let oidcSecurityService: OidcSecurityService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        imports: [
            TestAuthenticationModule,
            HttpClientTestingModule,
            RouterTestingModule
        ],
        providers: [
            AuthContext
        ],

        });

    }));

    beforeEach(async(() => {
        authContextService = TestBed.get(AuthContext);
        oidcSecurityService = TestBed.get(OidcSecurityService);
    }));

    it('should construct', () => {
        expect(authContextService).toBeTruthy();
    });

    it('should logoff', () => {
        spyOn(oidcSecurityService, 'logoff').and.callFake(() => {});
        expect(oidcSecurityService.logoff).not.toHaveBeenCalled();
        authContextService.logoff();
        expect(oidcSecurityService.logoff).toHaveBeenCalled();
    });

    it('should login', () => {
        spyOn(oidcSecurityService, 'authorize').and.callFake(() => {});
        expect(oidcSecurityService.authorize).not.toHaveBeenCalled();
        authContextService.logIn();
        expect(oidcSecurityService.authorize).toHaveBeenCalled();
    });

    it('should not login if already authenticated', fakeAsync(() => {
        spyOn(oidcSecurityService, 'authorize').and.callFake(() => {});
        spyOnProperty(authContextService, 'isAuthenticated', 'get').and.returnValue(true);
        expect(oidcSecurityService.authorize).not.toHaveBeenCalled();
        tick();
        authContextService.logIn();
        expect(oidcSecurityService.authorize).not.toHaveBeenCalled();
    }));

    it('should return the user', fakeAsync(() => {
        const user = new UserProfile();
        user.GivenName = 'Tim';
        user.Email = 'b@p.com';

        spyOnProperty(authContextService, 'userInfo$', 'get').and.returnValue(Observable.of(user));

        authContextService.userInfo$.subscribe((userProfile) => {
            expect(userProfile).toEqual(user);
        });

        spyOn(oidcSecurityService, 'getUserData').and.callFake(() => Observable.of(user));
        tick();

    }));

    it('should get Bearer token when authenticated', () => {
        spyOnProperty(authContextService, 'isAuthenticated', 'get').and.returnValue(true);
        spyOn(oidcSecurityService, 'getToken').and.returnValue('I am a token');

        expect(authContextService.getAuthenticationHeaderValue('blah')).toEqual('Bearer I am a token');
    });

    it('should not get Bearer token when not authenticated', () => {
        spyOnProperty(authContextService, 'isAuthenticated', 'get').and.returnValue(false);
        spyOn(oidcSecurityService, 'getToken').and.returnValue('I am a token');

        expect(authContextService.getAuthenticationHeaderValue('blah')).toEqual(null);
    });

    xit('should get the roles', () => {
        spyOn(oidcSecurityService, 'getToken').and.returnValue('I.am.a.token');
    });

});
