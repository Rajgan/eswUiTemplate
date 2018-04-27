import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApiErrorModel } from '../../models/error.model';


export class HttpServiceBase {
  protected handleError(httpErrorReponse: HttpErrorResponse) {
    // See https://angular.io/guide/http for error handling
    if (!httpErrorReponse.error) {
      return httpErrorReponse.message;
    } else if (httpErrorReponse.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      return Observable.throw(`${httpErrorReponse.error.message ? httpErrorReponse.error.message : httpErrorReponse.toString()}`);
    } else if (typeof httpErrorReponse.error === 'object') {
      const apiErrorModel: ApiErrorModel = ApiErrorModel.FromHttpErrorResponse(httpErrorReponse);
      return Observable.throw(apiErrorModel);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong
      // tslint:disable-next-line:max-line-length
      return Observable.throw( `Server-side error: ${httpErrorReponse.status} - ${httpErrorReponse.statusText || ''} ${httpErrorReponse.error}`);
    }

  }
}
