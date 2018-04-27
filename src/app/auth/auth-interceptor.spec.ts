import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import { ValuesService } from '../shared/services/api/values.service';
import { ConfigService } from '../shared/services/configservice/config.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthContext } from './auth-context.service';

describe(`AuthHttpInterceptor`, () => {
  let service: ValuesService;
  let config: ConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthContext,
        ConfigService,
        ValuesService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });
    service = TestBed.get(ValuesService);
    config = TestBed.get(ConfigService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // verify there are no unsatisfied requests in the mockHttp queue
    httpMock.verify();
  });

  xit('should add an Authorization header', () => {

    service.getAllValues().subscribe(
      values => {
        expect(values.length).toEqual(0, 'should return empty airlines array');
        console.log(values);
      },
      fail
    );

    const req = httpMock.expectOne(service.baseUrl);
    expect(req.request.headers.has('Authorization'));
    expect(req.request.method).toEqual('GET');

    req.flush([]);

  });
});
