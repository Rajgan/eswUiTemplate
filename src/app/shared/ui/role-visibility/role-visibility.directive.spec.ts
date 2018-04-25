import { DebugElement, Component } from '@angular/core';
import { UserProfileService } from '../../../auth/userprofile.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleVisibilityDirective } from './role-visibility.directive';
import { ConfigService } from '../../services/configservice/config.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthModule } from 'angular-auth-oidc-client';
import { UserProfile } from '../../../auth/userprofile.model';
import { By } from '@angular/platform-browser';


describe('RoleVisibilityDirective', () => {
  let userService: UserProfileService;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          AuthModule.forRoot(),
          HttpClientTestingModule,
          RouterTestingModule
        ],
        declarations: [ RoleVisibilityDirective, TestComponent ],
        providers: [ UserProfileService, ConfigService ]
      })
      .compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      userService = TestBed.get(UserProfileService);

      debugElement =  fixture.debugElement.query(By.directive(RoleVisibilityDirective));
  }));

  it('RoleShow is hidden, then shown', () => {

    expect(debugElement).toBeTruthy();

    fixture.detectChanges();
    // check hidden
    expect(debugElement.nativeElement.style.display).toBe('none');

    // Set profile
    userService.userProfile = new UserProfile();
    userService.userRoles = ['testRole'];
    fixture.detectChanges();

    // Check shown
    expect(debugElement.nativeElement.style.display).toBe('inline');
  });
});

@Component({
  template: `<input eswRoleVisibility />`
})
class TestComponent { }
