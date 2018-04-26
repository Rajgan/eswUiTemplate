import { HttpErrorResponse } from '@angular/common/http';
import { ErrorTypeCodeEnum } from '../enums/error-type-code.enum';

/*
e.g.
{"errorTypeCode":2,"errorIdentifier":ghdfkashdfi-askghkisdghi,
"errors":[{"errorCode":2001,"errorKey":"RoutingRule","errorMessage":"No valid Route Match for given Input"}]
}
*/

export class ApiErrorModel {
  statusCode: number;
  errorTypeCode: ErrorTypeCodeEnum;
  errors: ErrorDetailsModel[];
  errorIdentifier: string;
  message: string;

  static FromHttpErrorResponse(arg0: HttpErrorResponse): ApiErrorModel {
    // throw new Error('Method not implemented.');

    const apiErrorModel: ApiErrorModel = new ApiErrorModel();
    apiErrorModel.errors = [];
    apiErrorModel.statusCode = arg0.status;
    apiErrorModel.errorIdentifier = arg0.error.errorIdentifier;
    apiErrorModel.errorTypeCode = arg0.error.errorType;
    apiErrorModel.message = `${arg0.message} ${arg0.error.hasOwnProperty('message') ? arg0.error.message : ''}`;
      if (arg0.error.errorDetails) {
        for (const arg1 of arg0.error.errorDetails) {
          apiErrorModel.errors.push(this.assignError(arg1));
        }
      }

    return apiErrorModel;
  }

  private static assignError(error: any): ErrorDetailsModel {
    const errorModel: ErrorDetailsModel = new ErrorDetailsModel();
    errorModel.errorCode = error.errorCode;
    errorModel.errorKey = error.errorKey;
    errorModel.errorMessage = error.errorMessage;
    return errorModel;
  }
}

export class ErrorDetailsModel {
  errorCode: string;
  errorKey: string;
  errorMessage: string;
}



