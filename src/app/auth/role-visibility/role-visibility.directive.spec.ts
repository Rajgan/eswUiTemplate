import { DebugElement, Component } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RoleVisibilityDirective } from './role-visibility.directive';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthModule } from 'angular-auth-oidc-client';
import { UserProfile } from '../userprofile.model';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Store } from '@ngrx/store';
import { AuthState } from '../reducers/auth';
import { TestModule } from '../../shared/testing/testModule';


describe('RoleVisibilityDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;
  let dir: RoleVisibilityDirective;
  const userRole = 'testRole';
  // let store: Store<AuthState>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          TestModule
        ],
        declarations: [ RoleVisibilityDirective, TestComponent ]
      })
      .compileComponents();
    }));

  beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      debugElement = fixture.debugElement.query(By.directive(RoleVisibilityDirective));
      dir = debugElement.injector.get(RoleVisibilityDirective) as RoleVisibilityDirective;
      expect(dir).toBeTruthy();
  });

  describe('RoleVisibility', () => {
    it('is hidden', fakeAsync(() => {

      dir.matchRole = '';
      dir.isLoggedIn$ = Observable.of(false);
      dir.roles$ = Observable.of([]);
      tick();
      fixture.detectChanges();
      // check hidden
      expect(debugElement.nativeElement.style.display).toBe('none');
    }));

    it('is shown', fakeAsync(() => {

      dir.matchRole = userRole;
      dir.isLoggedIn$ = Observable.of(true);
      dir.roles$ = Observable.of([userRole]);
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
