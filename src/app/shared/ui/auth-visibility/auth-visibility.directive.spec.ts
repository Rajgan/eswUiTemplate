import { Component, DebugElement, APP_INITIALIZER } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthHideDirective, AuthShowDirective } from './auth-visibility.directive';
import { By } from '@angular/platform-browser';
import { dispatchEvent, createEvent } from '../../testing/utils';
import { UserProfileService } from '../../../auth/userprofile.service';
import { UserProfile } from '../../../auth/userprofile.model';
import { OidcSecurityService, OidcConfigService, AuthModule } from 'angular-auth-oidc-client';
import { AuthInterceptor } from '../../../auth/auth-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfigService } from '../../services/configservice/config.service';
import { AuthorizationGuard } from '../../../auth/authorization.guard';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthVisibilityDirectives', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugShowAuthElement: DebugElement;
  let debugHideAuthElement: DebugElement;
  let userService: UserProfileService;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          AuthModule.forRoot(),
          HttpClientTestingModule,
          RouterTestingModule
        ],
        declarations: [ AuthHideDirective, AuthShowDirective, TestComponent ],
        providers: [ UserProfileService, ConfigService ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      userService = TestBed.get(UserProfileService);

      debugShowAuthElement = fixture.debugElement.query(By.directive(AuthShowDirective));
      debugHideAuthElement = fixture.debugElement.query(By.directive(AuthHideDirective));
  });

  it('AuthShow is hidden, then shown', () => {

    expect(debugShowAuthElement).toBeTruthy();

    // check hidden
    let el = fixture.debugElement.query(By.css('input'));
    expect(el.nativeElement.style.display).toBe('none');

    // Set profile
    userService.userProfile = new UserProfile();
    fixture.detectChanges();

    // Check shown
    el = fixture.debugElement.query(By.css('input'));
    expect(el.nativeElement.style.display).toBe('inline');
  });
  it('AuthHide is shown, then hidden', () => {

    expect(debugHideAuthElement).toBeTruthy();

    // check shown
    expect(debugHideAuthElement.nativeElement.style.display).toBe('inline');

    // Set profile
    userService.userProfile = new UserProfile();
    fixture.detectChanges();

    // Check hidden
    expect(debugHideAuthElement.nativeElement.style.display).toBe('none');
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
