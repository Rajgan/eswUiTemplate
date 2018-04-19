import { Component, ViewChild } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GenericModalService } from './../shared/services/gernericmodal/genericmodal.service';
import { ModalType, ModalStyle } from './../shared/ui/genericmodal/genericmodal.component';
import { CustomComponent } from './custom-modal/custommodal.component';
import { AppInsightsService } from '../shared/services/appInsights/appInsights.module';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'eswStyleGuide',
  templateUrl: './style-guide.component.html'
})
export class StyleGuideComponent {

  @ViewChild('customModal') exampleModal: CustomComponent;
  public ShowAdvanced = false;

  public constructor(
    private appInsights: AppInsightsService,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: GenericModalService) {
  }

  public showSpinnerClick(): void {
    this.appInsights.trackEvent('template-ui');
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 5000);
  }

  public showModalClick(): void {
    this.modalService.showDialog('Example', 'This is an example modal', ModalType.OkOnly, ModalStyle.None);
  }

  public showCustomModalClick(): void {
    this.exampleModal.show();
  }
}
