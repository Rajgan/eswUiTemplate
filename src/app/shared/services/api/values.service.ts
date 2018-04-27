import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './../configservice/config.service';
import { HttpServiceBase } from './http-service-base.service';

@Injectable()
export class ValuesService extends HttpServiceBase {

  baseUrl: string;

  constructor(private http: HttpClient, private appConfig: ConfigService) {
    super();
    this.baseUrl = appConfig.UI_API_URL.url + '/Values';
   }

  getAllValues(): Observable<any> {
      return this.http.get<any>(this.baseUrl).catch(error => this.handleError(error));
  }

  getValuesById(id: number): Observable<any> {
    const url = this.baseUrl + '/' + id;
    return this.http.get<any>(url).catch(error => this.handleError(error));
  }
}
