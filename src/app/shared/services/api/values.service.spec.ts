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

        it('should fail for Bad Request', () => {
            const input = 0;
            const BAD_REQUEST = 400;
            const errorIdentifier = 'cfc78ed9-4e771215efdd64b1';
            const errorKey = 'Id';
            const errorMessage = 'Invalid Id Passed';

            valuesService.getValuesById(input).subscribe(
                () => {
                    fail('expected error');
                  },
                  (error) => {
                    expect(error.errorIdentifier).toEqual(errorIdentifier);
                    expect(error.statusCode).toEqual(BAD_REQUEST);
                    expect(error.errors[0].errorKey).toEqual(errorKey);
                    expect(error.errors[0].errorMessage).toEqual(errorMessage);
            });

            const url = baseUrl + '/Values/' + input;
            const request = httpMock.expectOne({ method: 'get', url: url });
            expect(request.request.method).toEqual('GET', url);
            request.flush({
                    errorType: 2,
                    errorDetails: [{
                        errorKey: errorKey, errorCode: '1001', errorMessage: errorMessage
                    }],
                    errorIdentifier: errorIdentifier
                },
                { status: BAD_REQUEST, statusText: 'Bad Request' });
            httpMock.verify();
        });

        it('should fail for Server Error', () => {
            const input = 0;
            const BAD_REQUEST = 500;
            const statusText = 'Bad Request';
            const errMsg = 'boom';

            valuesService.getValuesById(input).subscribe(
                () => {
                    fail('expected error');
                  },
                  (error) => {
                    expect(error).toEqual(`Server-side error: ${BAD_REQUEST} - ${statusText} ${errMsg}`);
            });

            const url = baseUrl + '/Values/' + input;
            const request = httpMock.expectOne({ method: 'get', url: url });
            expect(request.request.method).toEqual('GET', url);
            request.flush(errMsg, { status: BAD_REQUEST, statusText: statusText });
          });

    });
});
