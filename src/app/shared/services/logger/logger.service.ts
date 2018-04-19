import { Injectable } from '@angular/core';
import { LogLevel } from './LogLevel';
import { ConfigService } from '../configservice/config.service';

// Logger service that can be passed as a dependency into other classes that
// logs information to the console window.
@Injectable()
export class LoggerService {

    public constructor(private config: ConfigService) {
    }

    // Log a message of type error to the console.
    public logError(message: any) {
      if (this.config.LOGLEVEL !== LogLevel.none) {
        this.log(LogLevel.error, message);
      }
    }

    // Log a message of type info to the console.
    public logInfo(message: any) {
        this.log(LogLevel.info, message);
    }

    // Log a message of type warning to the console.
    public logWarning(message: any) {
        this.log(LogLevel.warning, message);
    }

    // Log a message of type debug to the console.
    public logDebug(message: any) {
        this.log(LogLevel.debug, message);
    }

    // Log a message to the console of the required type.
    public log(level: LogLevel, message: any) {

        switch (level) {
            // tslint:disable-next-line:no-console
            case LogLevel.debug: console.debug(message); break;
            case LogLevel.warning: console.warn(message); break;
            // tslint:disable-next-line:no-console
            case LogLevel.info: console.info(message); break;
            case LogLevel.error:
            case LogLevel.fatal: console.error(message); break;
            case LogLevel.none: break;
        }
    }
}
