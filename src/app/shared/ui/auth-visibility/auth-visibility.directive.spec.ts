import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, DebugElement, APP_INITIALIZER } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthHideDirective, AuthShowDirective } from './auth-visibility.directive';
import { By } from '@angular/platform-browser';
import { dispatchEvent, createEvent } from '../../testing/utils';
import { TestModule } from '../../testing/testModule';
import { Store, StoreModule, META_REDUCERS } from '@ngrx/store';
import { AuthState, AuthReducerFeature, reducer } from '../../../auth/reducers/auth';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../../auth/effects/auth.effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AuthContext } from '../../../auth/auth-context.service';
import { AuthenticationModule } from '../../../auth/authentication.module';

describe('AuthVisibilityDirectives', () => {
  let fixture: ComponentFixture<TestComponent>;
  let debugShowAuthElement: DebugElement;
  let debugHideAuthElement: DebugElement;
  let store: Store<AuthState>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          TestModule
        ],
        declarations: [ AuthHideDirective, AuthShowDirective, TestComponent ]
      })
      .compileComponents();
  }));

  describe('AuthShow', () => {
    it('is hidden', () => {
      store = TestBed.get(Store);
      spyOn(store, 'select').and.returnValue(Observable.of(false));

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      debugShowAuthElement = fixture.debugElement.query(By.directive(AuthShowDirective));
      expect(debugShowAuthElement).toBeTruthy();

      // check hidden
      expect(debugShowAuthElement.nativeElement.style.display).toBe('none');
    });

    it('is shown', () => {
      store = TestBed.get(Store);
      spyOn(store, 'select').and.returnValue(Observable.of(true));

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      debugShowAuthElement = fixture.debugElement.query(By.directive(AuthShowDirective));
      expect(debugShowAuthElement).toBeTruthy();

      // check shown
      expect(debugShowAuthElement.nativeElement.style.display).toBe('inline');
    });
  });

  describe('AuthHide', () => {
    it('is hidden', () => {
      store = TestBed.get(Store);
      spyOn(store, 'select').and.returnValue(Observable.of(true));

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      debugHideAuthElement = fixture.debugElement.query(By.directive(AuthHideDirective));
      expect(debugHideAuthElement).toBeTruthy();

      // check hidden
      expect(debugHideAuthElement.nativeElement.style.display).toBe('none');
    });

    it('is shown', () => {
      store = TestBed.get(Store);
      spyOn(store, 'select').and.returnValue(Observable.of(false));

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      debugHideAuthElement = fixture.debugElement.query(By.directive(AuthHideDirective));
      expect(debugHideAuthElement).toBeTruthy();

      // check shown
      expect(debugHideAuthElement.nativeElement.style.display).toBe('inline');
    });
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
