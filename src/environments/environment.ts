import { LogLevel } from '../app/shared/services/logger/LogLevel';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  uiHostUrl: { url: 'http://localhost:4201' },
  uiApiUrl: { url: 'http://localhost:4000/api/v1', isAuthenticated: true },
  stsAuthUrl: { url: 'https://test-sts-security-esw.eshopworld.net:9202', isAuthenticated: true },
  envName: 'Dev',
  version: '.0.0.1',
  showBreadcrumb: true,
  Logging: {
    loglevel: LogLevel.debug,
    Telemetry: {
      enabled: true,
      InstrumentationKey: 'e5bcfbcd-bcfd-4614-b460-fbe14f66a1f4'
    },
  }
};

