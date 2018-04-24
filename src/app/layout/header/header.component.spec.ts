import { AuthenticationModule } from './../../auth/authentication.module';
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
import { UserProfileService } from '../../auth/userprofile.service';
import { UserProfile } from '../../auth/userprofile.model';

describe('Component: HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let genericModalService: GenericModalService;
  let userService: UserProfileService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedUiModule,
        ModalModule.forRoot(),
        TranslateModule.forRoot(),
        AuthenticationModule,
        HttpClientTestingModule
      ],
      declarations: [ HeaderComponent ],
      providers: [GenericModalService, UserProfileService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    genericModalService = fixture.debugElement.injector.get(GenericModalService);
    userService = fixture.debugElement.injector.get(UserProfileService);
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

  it('should set user profile', () => {

    const user = new UserProfile();
    user.Email = 'test@Test.com';
    user.FamilyName = 'test test';
    user.GivenName = 'test';

    userService.userProfile = user;

    expect(userService.userProfile).toBeDefined();
  });

  it('should login', () => {
    spyOn(userService, 'login').and.callFake(function() {});
    component.login();
    expect(userService.login).toHaveBeenCalledTimes(1);
  });

  it('should logout', () => {
    spyOn(userService, 'logout').and.callFake(function() {});
    component.logout();
    expect(userService.logout).toHaveBeenCalledTimes(1);
  });
});
