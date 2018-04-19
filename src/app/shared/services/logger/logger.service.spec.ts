import { ConfigService } from './../configservice/config.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { ConsoleSpy } from '../../testing/utils';
import { LogLevel } from './LogLevel';

describe('LoggerService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let loggerService: LoggerService;
    let originalConsole, fakeConsole;

    beforeEach(() => {
        // replace the real window.console with our spy
        fakeConsole = new ConsoleSpy();
        originalConsole = window.console;
        (<any>window).console = fakeConsole;

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                LoggerService,
                ConfigService
            ],
        });

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        loggerService = TestBed.get(LoggerService);
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

});
