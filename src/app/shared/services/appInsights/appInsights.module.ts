import { ModuleWithProviders, SkipSelf, Optional, NgModule } from '@angular/core';
import { AppInsightsConfig } from './appInsights.config';
import { AppInsightsService } from './appInsights.service';

export * from './appInsights.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ CommonModule ],
    declarations: [],
    exports: [],
    providers: [ AppInsightsService ]
  })
  export class ApplicationInsightsModule {
    constructor (
      @Optional() @SkipSelf() parentModule: ApplicationInsightsModule,
      appInsightsService: AppInsightsService
    ) {
      if (!parentModule) {
          appInsightsService.init();
      }
    }

    static forRoot(config: AppInsightsConfig): ModuleWithProviders {
      return {
        ngModule: ApplicationInsightsModule,
        providers: [
          { provide: AppInsightsConfig, useValue: config },
          AppInsightsService
        ]
      };
    }
  }
