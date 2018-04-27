import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
// import { CobrouteService } from '../shared/services/api/cobroute.service';
import { ConfigService } from '../shared/services/configservice/config.service';
import { AuthenticationModule } from './authentication.module';
import { RouterTestingModule } from '@angular/router/testing';

describe(`AuthHttpInterceptor`, () => {
  // let service: CobrouteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AuthenticationModule
      ],
      providers: [
        ConfigService,
        // CobrouteService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });
    // service = TestBed.get(CobrouteService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should add an Authorization header', () => {

    // set user profile.

    // Run http request.
    // service.getAllCobRoutes().subscribe(response => {
    //  expect(response).toBeTruthy();
    // });

    // const httpRequest = httpMock.expectOne(appConfig.UI_API_URL + '/cobroute');

    // expect(httpRequest.request.headers.has('Authorization'));
  });
});
