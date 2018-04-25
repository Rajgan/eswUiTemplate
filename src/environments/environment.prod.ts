import { LogLevel } from '../app/shared/services/logger/LogLevel';

export const environment = {
  production: true,
  uiHostUrl: { url: '#{uiHostUrlPROD}' },
  uiApiUrl: { url: '#{uiApiUrlPROD}', isAuthenticated: true },
  stsAuthUrl: { url: '#{stsAuthUrlPROD}', isAuthenticated: true },
  envName: '#{backendenvNameapiUrlPROD}',
  version: '#{versionPROD}',
  showBreadcrumb: Boolean('#{showBreadcrumbPROD}'),
  Logging: {
    loglevel: LogLevel['#{loglevelPROD}'],
    Telemetry: {
      enabled: Boolean('#{telemetryEnabledPROD}'),
      InstrumentationKey: '#{telemetryInternalKeyPROD}'
    },
  }
};
