import { SharedServicesModule } from './shared/services/shared-services.module';
import { Component, ViewChild } from '@angular/core';
import { LayoutModule } from './layout/layout.module';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng4LoadingSpinnerComponent, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthenticationModule } from './auth/authentication.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let translateService: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LayoutModule,
        SharedServicesModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        ModalModule.forRoot(),
        AuthenticationModule
      ],
      providers: [ Ng4LoadingSpinnerService, TranslateService ],
      declarations: [
        AppComponent,
        Ng4LoadingSpinnerComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    translateService = fixture.debugElement.injector.get(TranslateService);
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    localStorage.setItem('lang', 'en');
    expect(component).toBeTruthy();
  }));

  it('should default the language to en', async(() => {
    localStorage.setItem('lang', 'fr');
    expect(component.currentLang).toEqual('en');
  }));

  it(`should have as title 'app'`, async(() => {
    expect(component.title).toEqual('app');
  }));

  it('should return the current language', () => {
    const lang = 'ie';
    translateService.currentLang = lang;
    expect(component.currentLang).toEqual(lang);
  });

  it('will return a translated language file', () => {
    const spy = spyOn(translateService, 'instant');
    const translatedLang = component.currentLangTranslated;
    expect(spy).toHaveBeenCalledTimes(1);
  });

});


