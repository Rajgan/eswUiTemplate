import { GenericModalComponent } from './../../shared/ui/genericmodal/genericmodal.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterModule, Routes } from '@angular/router';
import { GenericModalService } from '../../shared/services/gernericmodal/genericmodal.service';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedUiModule } from '../../shared/ui/shared-ui.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserProfile } from '../../auth/userprofile.model';
import { TestModule } from '../../shared/testing/testModule';
import { AuthContext } from '../../auth/auth-context.service';
import { AuthState } from '../../auth/reducers/auth';
import { Store } from '@ngrx/store';
import { Logoff, Authorize } from '../../auth/actions/auth';
import { TestAuthenticationModule } from '../../shared/testing/testAuthenticationModule';

describe('Component: HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let genericModalService: GenericModalService;
  let store: Store<AuthState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        RouterTestingModule,
        SharedUiModule,
        ModalModule.forRoot(),
        TranslateModule.forRoot(),
        TestAuthenticationModule,
        HttpClientTestingModule
      ],
      declarations: [ HeaderComponent ],
      providers: [GenericModalService, AuthContext]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    genericModalService = fixture.debugElement.injector.get(GenericModalService);
    store = TestBed.get(Store);
    fixture.detectChanges();
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
    const spy = spyOn(store, 'dispatch');
    component.login();
    expect(spy).toHaveBeenCalledWith(new Authorize());
  });

  it('should logout', () => {
    const spy = spyOn(store, 'dispatch');
    component.logout();
    expect(spy).toHaveBeenCalledWith(new Logoff());
  });
});
