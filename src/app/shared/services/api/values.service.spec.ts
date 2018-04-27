import { TestBed, inject } from '@angular/core/testing';
import { ValuesService } from './values.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './../configservice/config.service';
import { SampleResponse } from '../../models/sampleresponse.model';



describe('ValuesService', () => {
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;
    let baseUrl: string;
    let valuesService: ValuesService;
    let appConfig: ConfigService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ValuesService, ConfigService]
        });

        httpClient = TestBed.get(HttpClient);
        appConfig = TestBed.get(ConfigService);
        httpMock = TestBed.get(HttpTestingController);
        valuesService = TestBed.get(ValuesService);
        baseUrl = appConfig.UI_API_URL.url;


    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpMock.verify();
    });

    it('should be created', inject([ValuesService], (service: ValuesService) => {
        expect(service).toBeTruthy();
    }));

    describe('getAllValues', () => {
        let expectedResult: string[];

        beforeEach(() => {
            expectedResult = ['value1', 'value2'] as string[];
        });

        it('should return all values', () => {
            valuesService.getAllValues().subscribe(
                cobroute => expect(cobroute).toEqual(expectedResult, 'should return expected values')
            );

            const url = baseUrl + '/Values';
            const req = httpMock.expectOne({ method: 'get', url: url });
            expect(req.request.method).toEqual('GET', url);

            req.flush(expectedResult);
            httpMock.verify();
        });


    });

    // Sample for error catching
    describe('getValuesById', () => {

        it('should return all values', () => {
            const input = 0;
            const BAD_REQUEST = 400;
            valuesService.getValuesById(input).subscribe(
                (result) => {
                    expect('getAllById should fail on this test').toBeFalsy();
                },
                (fail) => {
                    expect(fail).toBeTruthy();
                }
            );

            const url = baseUrl + '/Values/' + input;
            const request = httpMock.expectOne({ method: 'get', url: url });
            expect(request.request.method).toEqual('GET', url);
            request.flush(JSON.stringify({
                error: {
                    errorType: 2, errorDetails: [
                        { errorKey: 'Id', errorCode: '1001', errorMessage: 'Invalid Id Passed' }],
                    errorIdentifier: 'cfc78ed9-4e771215efdd64b1'
                }
            }),
                { status: BAD_REQUEST, statusText: 'Bad Request' });
            httpMock.verify();
        });

    });
});
