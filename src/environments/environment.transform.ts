import { LogLevel } from '../app/shared/services/logger/LogLevel';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  uiHostUrl: { url: '#{uiHostUrl}' },
  uiApiUrl: { url: '#{uiApiUrl}', isAuthenticated: true },
  stsAuthUrl: { url: '#{stsAuthUrl}', isAuthenticated: true },
  envName: '#{backendenvNameapiUrl}',
  version: '#{version}',
  showBreadcrumb: Boolean('#{showBreadcrumb}'),
  Logging: {
    loglevel: LogLevel['#{loglevel}'],
    Telemetry: {
      enabled: Boolean('#{telemetryEnabled}'),
      InstrumentationKey: '#{telemetryInternalKey}'
    },
  },
  production: Boolean('#{production}')
};
