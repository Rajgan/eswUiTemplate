import { LogLevel } from '../app/shared/services/logger/LogLevel';

export const environment = {
  uiHostUrl: '#{uiHostUrlPROD}',
  uiApiUrl: '#{uiApiUrlPROD}',
  stsAuthUrl: '#{stsAuthUrlPROD}',
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
