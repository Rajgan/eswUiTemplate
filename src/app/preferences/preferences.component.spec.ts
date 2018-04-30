import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PreferencesComponent } from './preferences.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('Component: PreferencesComponent', () => {
  let component: PreferencesComponent;
  let fixture: ComponentFixture<PreferencesComponent>;
  let translateService: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [ TranslateService ],
      declarations: [ PreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesComponent);
    component = fixture.componentInstance;
    translateService = fixture.debugElement.injector.get(TranslateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    localStorage.setItem('lang', 'en');
    expect(component).toBeTruthy();
  });

  it('should update the translateService with the language', () => {
    const spy = spyOn(translateService, 'use').and.callThrough();
    const newLang = 'de';
    component.languageChanged(newLang);
    expect(spy).toHaveBeenCalledWith(newLang);
    expect(localStorage.getItem('lang')).toEqual(newLang);
  });

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
