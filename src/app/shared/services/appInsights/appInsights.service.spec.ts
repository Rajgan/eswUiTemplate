import { ConfigService } from './../configservice/config.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppInsightsService } from './appInsights.service';
import { ConsoleSpy } from '../../testing/utils';
import { ApplicationInsightsModule } from './appInsights.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('AppInsightsService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let appInsightsService: AppInsightsService;
    let originalConsole, fakeConsole;
    let router: Router;

    beforeEach(() => {
        // replace the real window.console with our spy
        fakeConsole = new ConsoleSpy();
        originalConsole = window.console;
        (<any>window).console = fakeConsole;

        TestBed.configureTestingModule({
            imports: [
              HttpClientTestingModule,
              RouterTestingModule,
              ApplicationInsightsModule.forRoot({ instrumentationKeySetlater: true })
            ],
            providers: [
              ConfigService
            ],
        });

        httpClient = TestBed.get(HttpClient);
        router = TestBed.get(Router);
        httpTestingController = TestBed.get(HttpTestingController);
        appInsightsService = TestBed.get(AppInsightsService);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    // restores the real console
    afterAll(() => (<any>window).console = originalConsole);

    it('should be created', inject([AppInsightsService], (service: AppInsightsService) => {
      service.init();
      service.flush();
      expect(service).toBeTruthy();
      service.config.instrumentationKey = '';
      service.config.instrumentationKeySetlater = false;
      service.init();
      expect(service).toBeTruthy();
      service.config.instrumentationKeySetlater = true;
      service.init();
      expect(service).toBeTruthy();
      service.config = null;
      service.init();
      expect(service).toBeTruthy();
    }));

    it('should be created with instrumentation key', inject([AppInsightsService], (service: AppInsightsService) => {
      service.config.instrumentationKey = '';
      service.config.instrumentationKeySetlater = false;
      service.config.overrideTrackPageMetrics = null;
      service.init();
      router.navigate(['./']);
      expect(service).toBeTruthy();
      service.config.instrumentationKey = '';
      service.config.overrideTrackPageMetrics = true;
      service.init();
      router.navigate(['./']);
      expect(service).toBeTruthy();
      service.config.instrumentationKey = '';
      service.config.overrideTrackPageMetrics = false;
      service.init();
      router.navigate(['./']);
      expect(service).toBeTruthy();
    }));

    it('should be created without trackPageMetrics', inject([AppInsightsService], (service: AppInsightsService) => {
      service.config.overrideTrackPageMetrics = false;
      service.init();
      router.navigate(['./']);
      expect(service).toBeTruthy();
    }));

    it('should log an error message to console', () => {
      spyOn(appInsightsService, 'trackEvent').and.callThrough();
      appInsightsService.trackEvent('test event');
      expect(appInsightsService.trackEvent).toHaveBeenCalledTimes(1);
    });

    it('should start and stop event tracking', () => {
      spyOn(appInsightsService, 'startTrackEvent').and.callThrough();
      spyOn(appInsightsService, 'stopTrackEvent').and.callThrough();
      appInsightsService.startTrackEvent('start test');
      appInsightsService.stopTrackEvent('stop test');
      expect(appInsightsService.startTrackEvent).toHaveBeenCalledTimes(1);
      expect(appInsightsService.stopTrackEvent).toHaveBeenCalledTimes(1);
    });

    it('should trackPageView', () => {
      spyOn(appInsightsService, 'trackPageView').and.callThrough();
      appInsightsService.trackPageView('start test');
      expect(appInsightsService.trackPageView).toHaveBeenCalledTimes(1);
    });

    it('should start and stop page tracking', () => {
      spyOn(appInsightsService, 'startTrackPage').and.callThrough();
      spyOn(appInsightsService, 'stopTrackPage').and.callThrough();
      appInsightsService.startTrackPage('start test');
      appInsightsService.stopTrackPage('stop test');
      expect(appInsightsService.startTrackPage).toHaveBeenCalledTimes(1);
      expect(appInsightsService.stopTrackPage).toHaveBeenCalledTimes(1);
    });

    it('should trackMetric', () => {
      spyOn(appInsightsService, 'trackMetric').and.callThrough();
      appInsightsService.trackMetric('start test', 1);
      expect(appInsightsService.trackMetric).toHaveBeenCalledTimes(1);
    });

    it('should trackException', () => {
      spyOn(appInsightsService, 'trackException').and.callThrough();
      appInsightsService.trackException(new Error(), '', {}, {}, 1);
      expect(appInsightsService.trackException).toHaveBeenCalledTimes(1);
      appInsightsService.trackException(new Error(), '', {}, {}, 3);
      expect(appInsightsService.trackException).toHaveBeenCalledTimes(2);
      appInsightsService.trackException(new Error(), '', {}, {});
      expect(appInsightsService.trackException).toHaveBeenCalledTimes(3);
    });

    it('should call trackTrace', () => {
      spyOn(appInsightsService, 'trackTrace').and.callThrough();
      appInsightsService.trackTrace('start test');
      expect(appInsightsService.trackTrace).toHaveBeenCalledTimes(1);
    });

    it('should call trackDependency', () => {
      spyOn(appInsightsService, 'trackDependency').and.callThrough();
      appInsightsService.trackDependency('start test', 'testMethod', './', 'test', 1, true, 1);
      expect(appInsightsService.trackDependency).toHaveBeenCalledTimes(1);
    });

    it('should set and clear auth context', () => {
      spyOn(appInsightsService, 'setAuthenticatedUserContext').and.callThrough();
      spyOn(appInsightsService, 'clearAuthenticatedUserContext').and.callThrough();
      appInsightsService.setAuthenticatedUserContext('test', '', true);
      expect(appInsightsService.setAuthenticatedUserContext).toHaveBeenCalledTimes(1);
      appInsightsService.setAuthenticatedUserContext('test', '', false);
      expect(appInsightsService.setAuthenticatedUserContext).toHaveBeenCalledTimes(2);
      appInsightsService.setAuthenticatedUserContext('test', '');
      expect(appInsightsService.setAuthenticatedUserContext).toHaveBeenCalledTimes(3);
      appInsightsService.clearAuthenticatedUserContext();
      expect(appInsightsService.clearAuthenticatedUserContext).toHaveBeenCalledTimes(1);
    });
/*

    setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string, storeInCookie: boolean = false)
    clearAuthenticatedUserContext()

*/
});
