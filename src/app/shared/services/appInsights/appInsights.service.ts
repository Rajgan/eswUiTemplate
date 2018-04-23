
import { Injectable, Optional } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators/filter';
import { AppInsights } from 'applicationinsights-js';
import IAppInsights = AppInsights.IAppInsights;
import { AppInsightsConfig } from './appInsights.config';
import { ConfigService } from '../configservice/config.service';
import { LogError } from '../logger/logger.decorator';

@Injectable()
export class AppInsightsService implements IAppInsights {

  context: AppInsights.ITelemetryContext;
  queue: Array<() => void>;
  config: AppInsightsConfig;

  private isInitialised = false;

  constructor(
    @Optional() _config: AppInsightsConfig,
    public router: Router,
    private appConfig: ConfigService
  ) {
    _config.instrumentationKey = appConfig.TELEMETRY_INTERNAL_INSTRUMENTATIONKEY;
    _config.instrumentationKeySetlater = false;
    this.config = _config;
    this.init();
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackevent
  // trackEvent(name: string, properties?: {[string]:string}, measurements?: {[string]:number})
  // Log a user action or other occurrence.
  @LogError()
  trackEvent(eventName: string, eventProperties?: { [name: string]: string }, metricProperty?: { [name: string]: number }) {
    AppInsights.trackEvent(eventName, eventProperties, metricProperty);
  }

  @LogError()
  startTrackEvent(name: string): any {
    AppInsights.startTrackEvent(name);
  }

  @LogError()
  stopTrackEvent(name: string, properties?: { [p: string]: string }, measurements?: { [p: string]: number }): any {
    AppInsights.stopTrackEvent(name, properties, measurements);
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackpageview
  // trackPageView(name?: string, url?: string, properties?:{[string]:string}, measurements?: {[string]:number}, duration?: number)
  // Logs that a page or similar container was displayed to the user.

  @LogError()
  trackPageView(name?: string,
    url?: string,
    properties?: { [name: string]: string },
    measurements?: { [name: string]: number }, duration?: number) {
    AppInsights.trackPageView(name, url, properties, measurements, duration);
  }


  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#starttrackpage
  // startTrackPage(name?: string)
  // Starts the timer for tracking a page view. Use this instead of trackPageView if you want to control when the
  // page view timer starts and stops, but don't want to calculate the duration yourself. This method doesn't send any
  // telemetry. Call stopTrackPage to log the end of the page view and send the event.

  @LogError()
  startTrackPage(name?: string) {
    AppInsights.startTrackPage(name);
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#stoptrackpage
  // stopTrackPage(name?: string, url?: string, properties?: Object, measurements?: Object)
  // Stops the timer that was started by calling startTrackPage and sends the page view telemetry with the
  // specified properties and measurements. The duration of the page view will be the time between calling startTrackPage and stopTrackPage.

  @LogError()
  stopTrackPage(name?: string, url?: string, properties?: { [name: string]: string }, measurements?: { [name: string]: number }) {

    AppInsights.stopTrackPage(name, url, properties, measurements);
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackmetric
  // trackMetric(name: string, average: number, sampleCount?: number, min?: number, max?: number, properties?: {[string]:string})
  // Log a positive numeric value that is not associated with a specific event.
  // Typically used to send regular reports of performance indicators.

  @LogError()
  trackMetric(name: string, average: number, sampleCount?: number, min?: number, max?: number, properties?: { [name: string]: string }) {
    AppInsights.trackMetric(name, average, sampleCount, min, max, properties);
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackexception
  // trackException(exception: Error, handledAt?: string, properties?:
  // {[string]:string}, measurements?: {[string]:number}, severityLevel?: AI.SeverityLevel)
  // Log an exception you have caught. (Exceptions caught by the browser are also logged.)

  @LogError()
  trackException(exception: Error, handledAt?: string, properties?: { [name: string]: string },
    measurements?: { [name: string]: number }, severityLevel?: AppInsights.SeverityLevel) {
    AppInsights.trackException(exception, handledAt, properties, measurements, severityLevel);
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#tracktrace
  // trackTrace(message: string, properties?: {[string]:string}, measurements?: {[string]:number})
  // Log a diagnostic event such as entering or leaving a method.

  @LogError()
  trackTrace(message: string, properties?: { [name: string]: string }) {
    AppInsights.trackTrace(message, properties);
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackdependency
  // trackDependency(id: string, method: string, absoluteUrl: string,
  // pathName: string, totalTime: number, success: boolean, resultCode: number)
  // Log a dependency call (for instance: ajax)

  @LogError()
  trackDependency(id: string, method: string, absoluteUrl: string, pathName: string,
    totalTime: number, success: boolean, resultCode: number) {
    AppInsights.trackDependency(id, method, absoluteUrl, pathName, totalTime, success, resultCode);
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#flush
  // flush()
  // Immediately send all queued telemetry. Synchronous.
  // * You don't usually have to use this, as it happens automatically on window closing.

  @LogError()
  flush() {
    AppInsights.flush();
  }

  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#setauthenticatedusercontext
  // setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string)
  // Set the authenticated user id and the account id in this session. Use this when you have identified a specific
  // signed-in user. Parameters must not contain spaces or ,;=|
     /**
         * Sets the authenticated user id and the account id.

         * User auth id and account id should be of type string. They should not contain commas,
         * semi-colons, equal signs, spaces, or vertical-bars.
         *
         * By default the method will only set the authUserID and accountId for all events
         * in this page view. To add them to all events within
         * the whole session, you should either call this method on every page view or set `storeInCookie = true`.
         *
         * @param authenticatedUserId {string} - The authenticated user id. A unique and persistent
         * string that represents each authenticated user in the service.
         * @param accountId {string} - An optional string to represent the account associated with the authenticated user.
         * @param storeInCookie {boolean} - AuthenticateUserID will be stored in a cookie and added to all events within this session.
         */

        @LogError()
        setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string, storeInCookie: boolean = false) {
    AppInsights.setAuthenticatedUserContext(authenticatedUserId, accountId, storeInCookie);
  }



  // https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#clearauthenticatedusercontext
  // clearAuthenticatedUserContext ()
  // Clears the authenticated user id and the account id from the user context, and clears the associated cookie.

  @LogError()
  clearAuthenticatedUserContext() {
    AppInsights.clearAuthenticatedUserContext();
  }

  public init(): void {

    if (this.config) {
      if (this.config.instrumentationKey) {
        try {
          AppInsights.downloadAndSetup(this.config);

          if (!this.config.overrideTrackPageMetrics) {
            this.router.events.pipe(
              filter(event => event instanceof NavigationStart)
            ).subscribe((event: NavigationStart) => {
                this.startTrackPage(event.url);
              });

            this.router.events.pipe(
              filter(event => event instanceof NavigationEnd)
            ).subscribe((event: NavigationEnd) => {
                this.stopTrackPage(event.url);
              });
          }
          this.queue = AppInsights.queue;
          this.context = AppInsights.context;
          this.isInitialised = true;
        } catch (ex) {
          console.warn('Angular application insights Error [downloadAndSetup]: ', ex);
        }
      } else {
        if (!this.config.instrumentationKeySetlater) {
          // there is no this.config.instrumentationKey AND no this.config.instrumentationKeySetlater => Add log.
          console.warn('An instrumentationKey value is required to initialize AppInsightsService');
        }
      }
    } else {
      console.warn('You need forRoot on ApplicationInsightsModule, with or instrumentationKeySetlater or instrumentationKey set at least');
    }
  }
}

