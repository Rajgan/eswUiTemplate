import { DebugElement, Component } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RoleVisibilityDirective } from './role-visibility.directive';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthModule } from 'angular-auth-oidc-client';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AuthContext } from '../auth-context.service';
import { TestAuthenticationModule } from '../../shared/testing/testAuthenticationModule';


describe('RoleVisibilityDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;
  let dir: RoleVisibilityDirective;
  const userRole = 'testRole';
  let authService: AuthContext;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          TestAuthenticationModule
        ],
        declarations: [ RoleVisibilityDirective, TestComponent ]
      })
      .compileComponents();
    }));

  beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      authService = TestBed.get(AuthContext);
      spyOn(authService, 'getRoles').and.returnValue([userRole]);

      debugElement = fixture.debugElement.query(By.directive(RoleVisibilityDirective));
      dir = debugElement.injector.get(RoleVisibilityDirective) as RoleVisibilityDirective;
      expect(dir).toBeTruthy();
  });

  describe('RoleVisibility', () => {
    it('is hidden', fakeAsync(() => {
      spyOnProperty(authService, 'isAuthenticated$', 'get').and.returnValue(Observable.of(false));
      dir.matchRole = '';

      tick();
      fixture.detectChanges();
      // check hidden
      expect(debugElement.nativeElement.style.display).toBe('none');
    }));

    it('is shown', fakeAsync(() => {
      spyOnProperty(authService, 'isAuthenticated$', 'get').and.returnValue(Observable.of(true));
      dir.matchRole = userRole;

      tick();
      fixture.detectChanges();
      // check shown
      expect(debugElement.nativeElement.style.display).toBe('inline');
    }));
  });
});

@Component({
  template: `<input eswRoleVisibility />`
})
class TestComponent { }
