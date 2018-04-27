import { Component, DebugElement, APP_INITIALIZER } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleVisibilityDirective } from './role-visibility.directive';
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
import { RoleVisibiltyModule } from './role-visibility.module';


describe('RoleShowHideDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let userService: UserProfileService;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          AuthModule.forRoot(),
          HttpClientTestingModule,
          RouterTestingModule
        ],
        declarations: [ RoleVisibilityDirective, TestComponent ],
        providers: [ UserProfileService, ConfigService, OidcSecurityService, OidcConfigService ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(UserProfileService);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Role visibility is hidden, then shown', () => {
    fixture.whenStable().then(() => {
      // check hidden
      let el = fixture.debugElement.query(By.css('input'));
      expect(el.nativeElement.style.display).toBe('');

      expect(userService.hasRole('')).toBeTruthy();

      userService.userRoles = new Array<string>();
      expect(userService.hasRole('')).toBeTruthy();

      // Set profile
      let roles = new Array<string>();
      roles.push('test');

      userService.userRoles = roles;
      userService.userProfile = new UserProfile();
      fixture.detectChanges();

      expect(userService.hasRole('test')).toBeTruthy();
      expect(userService.isAuthorized).toBeTruthy();

      // Check shown
      el = fixture.debugElement.query(By.css('input'));
      expect(el.nativeElement.style.display).toBe('inline');

      roles = new Array<string>();

      userService.userRoles = roles;
      userService.userProfile = new UserProfile();
      fixture.detectChanges();

      // Check shown
      el = fixture.debugElement.query(By.css('input'));
      expect(el.nativeElement.style.display).toBe('none');
    });
  });
});

@Component({
  template: `
  <input eswRoleVisibility matchRole="test" />`
})
class TestComponent { }
