import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoggerService } from './logger/logger.service';
import { GenericModalService } from './gernericmodal/genericmodal.service';
import { ConfigService } from './configservice/config.service';
import { ApplicationInsightsModule } from './appInsights/appInsights.module';
import { ValuesService } from './values.service';

@NgModule({
  imports: [
    CommonModule,
    ApplicationInsightsModule.forRoot({ instrumentationKeySetlater: true })
  ],
  declarations: [],
  providers: [
    BsModalService,
    LoggerService,
    GenericModalService,
    ConfigService,
    ValuesService
  ],
  exports: []
})
export class SharedServicesModule { }
