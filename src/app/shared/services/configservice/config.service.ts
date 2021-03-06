import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { LogLevel } from '../logger/LogLevel';

// Logger service that can be passed as a dependency into other classes that
// logs information to the console window.
@Injectable()
export class ConfigService {

    public get UI_API_URL(): any {
        return environment.uiApiUrl.url;
    }
    public get ENV_NAME(): string {
        return environment.envName;
    }
    public get APP_VERSION(): string {
        return environment.version;
    }
    public get SHOW_BREADCUMB(): boolean {
        return environment.showBreadcrumb;
    }
    public get STS_AUTH_URL(): any {
      return environment.stsAuthUrl.url;
    }
    public get UI_HOST_URL(): any {
      return environment.uiHostUrl.url;
    }
    public get LOGLEVEL(): LogLevel {
      return environment.Logging.loglevel;
    }
    public get TELEMETRY_ENABLED(): boolean {
      return environment.Logging.Telemetry.enabled;
    }
    public get TELEMETRY_INTERNAL_INSTRUMENTATIONKEY(): string {
      return environment.Logging.Telemetry.InstrumentationKey;
    }


    public AUTH_URL(): string {
      return environment.stsAuthUrl.url;
    }
}
