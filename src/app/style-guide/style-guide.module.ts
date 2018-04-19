import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomComponent } from './custom-modal/custommodal.component';
import { StyleGuideComponent } from './style-guide.component';
import { StyleGuideRoutingModule } from './style-guide-routing.module';
import { BsDatepickerDirective, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedUiModule } from '../shared/ui/shared-ui.module';

@NgModule({
  imports: [
    CommonModule,
    StyleGuideRoutingModule,
    ModalModule,
    BsDatepickerModule.forRoot(),
    SharedUiModule
  ],
  declarations: [
    CustomComponent,
    StyleGuideComponent
  ],
})
export class StyleGuideModule { }
