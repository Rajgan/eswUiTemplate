import { Component, ViewChild } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GenericModalService } from './../shared/services/gernericmodal/genericmodal.service';
import { ModalType, ModalStyle } from './../shared/ui/genericmodal/genericmodal.component';
import { CustomComponent } from './custom-modal/custommodal.component';
import { AppInsightsService } from '../shared/services/appInsights/appInsights.module';
import { ValuesService } from '../shared/services/api/values.service';
import { ApiErrorModel } from '../shared/models/error.model';

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
    private modalService: GenericModalService,
    private valuesService: ValuesService) {
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

  public sampleServiceRequest(): void {
    this.valuesService.getValuesById(0)
    .subscribe(
      (response) => {
      console.log(response);
      },
      (error) => {
        console.log(error);
        const apiError = <ApiErrorModel>error;
        // Write you own logic to Publish you error
       }
    );
  }
}
