import { LogLevel } from '../app/shared/services/logger/LogLevel';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  uiHostUrl: 'http://localhost:4200',
  uiApiUrl: 'http://localhost:4000',
  stsAuthUrl: 'https://test-sts-security-esw.eshopworld.net:9202',
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

