import { TestAuthenticationModule } from './../shared/testing/testAuthenticationModule';
import { async, inject, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OidcSecurityService } from 'angular-auth-oidc-client';

import { AuthContext } from './auth-context.service';
import { TestModule } from '../shared/testing/testModule';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('Service: AuthContextService', () => {
    let authContextService: AuthContext;
    let oidcSecurityService: OidcSecurityService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        imports: [
            TestModule,
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

    xit('should not login if already authenticated', fakeAsync(() => {
        spyOn(oidcSecurityService, 'authorize').and.callFake(() => {});
        expect(oidcSecurityService.authorize).not.toHaveBeenCalled();
        spyOnProperty(authContextService, 'isAuthenticated$', 'get').and.returnValue(Observable.of(true));
        tick();
        authContextService.logIn();
        expect(oidcSecurityService.authorize).not.toHaveBeenCalled();
    }));

});
