import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericModalService } from './../../shared/services/gernericmodal/genericmodal.service';
import { ConfigService } from '../../shared/services/configservice/config.service';

// Component that will contain the header html. Populates the <navigation></navigation> element.
@Component({
  moduleId: module.id,
  selector: 'eswFooter',
  exportAs: 'eswFooter',
  templateUrl: 'footer.component.html',
})
export class FooterComponent {

  public year = '2018';
  public env: string;
  public version = '';

  public constructor(envConfig: ConfigService) {
    this.year = (new Date()).getFullYear().toString();
    this.env = envConfig.ENV_NAME;
    this.version = envConfig.APP_VERSION;
  }
}
