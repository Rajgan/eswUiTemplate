import { ConfigService } from './../configservice/config.service';
import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { ConsoleSpy } from '../../testing/utils';
import { LogLevel } from './LogLevel';
import { LogError } from './logger.decorator';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

describe('LoggerService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let loggerService: LoggerService;
    let configService: ConfigService;
    let originalConsole, fakeConsole;
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        // replace the real window.console with our spy
        fakeConsole = new ConsoleSpy();
        originalConsole = window.console;
        (<any>window).console = fakeConsole;

        TestBed.configureTestingModule({
          declarations: [  TestComponent ],
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                LoggerService,
                ConfigService
            ],
        })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      httpClient = TestBed.get(HttpClient);
      httpTestingController = TestBed.get(HttpTestingController);
      loggerService = TestBed.get(LoggerService);
      configService = TestBed.get(ConfigService);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    // restores the real console
    afterAll(() => (<any>window).console = originalConsole);

    it('should be created', inject([LoggerService], (service: LoggerService) => {
        expect(service).toBeTruthy();
    }));

    it('should log an error message to console', () => {
        const message = 'I am an Error';

        loggerService.logError(message);
        expect(fakeConsole.logs).toContain(message);

        environment.Logging.loglevel = LogLevel.none;

        loggerService.logError(message);
        expect(fakeConsole.logs).toContain(message);
    });

    it('should log an info message to console', () => {
        const message = 'I am Info';
        loggerService.logInfo(message);
        expect(fakeConsole.logs).toContain(message);
    });

    it('should log a warning message to console', () => {
        const message = 'I am a Warning';
        loggerService.logWarning(message);
        expect(fakeConsole.logs).toContain(message);
    });

    it('should log a debug message to console', () => {
        const message = 'I am a Debug message';
        loggerService.logDebug(message);
        expect(fakeConsole.logs).toContain(message);
    });

    it('should not output a message for LogLevel.none', () => {
        const message = 'I will not appear';
        loggerService.log(LogLevel.none, message);
        expect(fakeConsole.logs.length).toEqual(0);
    });


    it('should test LogError decorator', () => {
      component.testClick();
      expect(fakeConsole.logs).toContain('Error running testClick method: this is a test');
  });
});


@Component({ template: '' })
class TestComponent {

  @LogError()
  public testClick() {
    throw new Error('this is a test');
  }
}
