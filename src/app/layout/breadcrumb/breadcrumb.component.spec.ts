import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BreadcrumbComponent } from './breadcrumb.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { KeyValuePair } from '../../shared/models/keyvaluepair';

describe('Component: BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let router: Router;
  let translate: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        BreadcrumbComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    translate = TestBed.get(TranslateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set breadcrumb with test path', () => {

    router.navigate(['/home/test/1']);
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        expect(component.Breadcrumbs.length).toBe(2);
      }
    });
  });

  it('should set breadcrumb after navigation', () => {

    router.navigate(['/styles']);
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        expect(component.Breadcrumbs.length).toBe(1);
      }
    });
  });

  it('should set null breadcrumb', () => {

    router.navigate([]);
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        expect(component.Breadcrumbs).toBe(null);
      }
    });
  });

  it('should set emtpy breadcrumb', () => {

    router.navigate(['']);
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        expect(component.Breadcrumbs).toBe(null);
      }
    });
  });

  it('should set breadcrumb after language change', () => {

    setRoute();
    translate.use('en');
    router.navigate(['/test/tester']);
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        expect(component.Breadcrumbs.length).toBe(2);
      }
    });
  });

  function setRoute() {
    component.Breadcrumbs = [];
    const route1 = new KeyValuePair<string>();
    route1.key = 'home';
    route1.tag = 'breadcrumb.hom';
    route1.value = 'home';

    const route2 = new KeyValuePair<string>();
    route2.key = 'styles';
    route2.tag = 'breadcrumb.styles';
    route2.value = 'styles';

    component.Breadcrumbs = [ route1, route2 ];
  }
});
