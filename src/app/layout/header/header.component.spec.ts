import { UserProfile } from './../../auth/userprofile.model';
import { GenericModalComponent } from './../../shared/ui/genericmodal/genericmodal.component';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterModule, Routes } from '@angular/router';
import { GenericModalService } from '../../shared/services/gernericmodal/genericmodal.service';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedUiModule } from '../../shared/ui/shared-ui.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthContext } from '../../auth/auth-context.service';
import { TestAuthenticationModule } from '../../shared/testing/testAuthenticationModule';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('Component: HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let genericModalService: GenericModalService;
  let authService: AuthContext;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedUiModule,
        ModalModule.forRoot(),
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        TestAuthenticationModule
      ],
      declarations: [ HeaderComponent ],
      providers: [ GenericModalService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthContext);
    genericModalService = fixture.debugElement.injector.get(GenericModalService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the not implemented modal', () => {
    spyOn(genericModalService, 'showWarning').and.callThrough();
    component.notImplementedModal();
    expect(genericModalService.showWarning).toHaveBeenCalledTimes(1);
  });

  it('should login', () => {
    const spy = spyOn(authService, 'logIn');
    component.login();
    expect(spy).toHaveBeenCalled();
  });

  it('should logout', () => {
    const spy = spyOn(authService, 'logoff');
    component.logout();
    expect(spy).toHaveBeenCalled();
  });

  it('should display the user name when logged in', fakeAsync(() => {
    const user = new UserProfile();
    user.GivenName = 'Tim';
    spyOnProperty(authService, 'userInfo$', 'get').and.returnValue(Observable.of(user));

    tick();
    fixture.detectChanges();

    expect(component.name).toEqual('Tim');
  }));

  it('should not display the user name when logged out', fakeAsync(() => {
    spyOnProperty(authService, 'userInfo$', 'get').and.returnValue(Observable.of(null));

    tick();
    fixture.detectChanges();

    expect(component.name).toEqual(null);
  }));
});
