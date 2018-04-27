import { TestAuthenticationModule } from './../../shared/testing/testAuthenticationModule';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, DebugElement, APP_INITIALIZER } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthHideDirective, AuthShowDirective } from './auth-visibility.directive';
import { By } from '@angular/platform-browser';
import { dispatchEvent, createEvent } from '../../shared/testing/utils';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AuthContext } from '../auth-context.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

describe('AuthVisibilityDirectives', () => {
  let fixture: ComponentFixture<TestComponent>;
  let debugShowAuthElement: DebugElement;
  let debugHideAuthElement: DebugElement;
  let authService: AuthContext;
  let oidcSecurityService: OidcSecurityService;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          TestAuthenticationModule
        ],
        declarations: [ AuthHideDirective, AuthShowDirective, TestComponent ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.get(AuthContext);
    oidcSecurityService = TestBed.get(OidcSecurityService);
  });

  describe('AuthShow', () => {
    it('is hidden', fakeAsync(() => {
      spyOnProperty(authService, 'isAuthenticated$', 'get').and.returnValue(Observable.of(false));
      fixture = TestBed.createComponent(TestComponent);
      debugShowAuthElement = fixture.debugElement.query(By.directive(AuthShowDirective));

      tick();
      fixture.detectChanges();

      expect(debugShowAuthElement).toBeTruthy();

      // check hidden
      expect(debugShowAuthElement.nativeElement.style.display).toBe('none');
    }));

    it('is shown', fakeAsync(() => {
      spyOnProperty(authService, 'isAuthenticated$', 'get').and.returnValue(Observable.of(true));
      fixture = TestBed.createComponent(TestComponent);
      debugShowAuthElement = fixture.debugElement.query(By.directive(AuthShowDirective));
      tick();
      fixture.detectChanges();

      expect(debugShowAuthElement).toBeTruthy();

      // check shown
      expect(debugShowAuthElement.nativeElement.style.display).toBe('inline');
    }));
  });

  describe('AuthHide', () => {
    it('is hidden', fakeAsync(() => {
      spyOnProperty(authService, 'isAuthenticated$', 'get').and.returnValue(Observable.of(true));
      fixture = TestBed.createComponent(TestComponent);
      debugHideAuthElement = fixture.debugElement.query(By.directive(AuthHideDirective));
      tick();
      fixture.detectChanges();

      expect(debugHideAuthElement).toBeTruthy();

      // check hidden
      expect(debugHideAuthElement.nativeElement.style.display).toBe('none');
    }));

    it('is shown', fakeAsync(() => {
      spyOnProperty(authService, 'isAuthenticated$', 'get').and.returnValue(Observable.of(false));
      fixture = TestBed.createComponent(TestComponent);
      debugHideAuthElement = fixture.debugElement.query(By.directive(AuthHideDirective));
      tick();
      fixture.detectChanges();

      expect(debugHideAuthElement).toBeTruthy();

      // check shown
      expect(debugHideAuthElement.nativeElement.style.display).toBe('inline');
    }));
  });
});

@Component({
  template: `
  <input eswAuthShow />
  <div eswAuthHide>
    Show without Auth
  </div>`
})
class TestComponent { }
