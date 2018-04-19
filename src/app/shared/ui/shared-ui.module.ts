import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalInputDirective } from './decimalinput/decimalinput.directive';
import { NgbDropdownModule } from './dropdown/ngbdropdown.module';
import { NgbDropdownToggle } from './dropdown/ngbdropdown.directive';
import { GenericModalComponent } from './genericmodal/genericmodal.component';
import { DecimalInputModule } from './decimalinput/decimalinput.module';
import { CollapsePanelComponent } from './collapsePanel/collapsePanel.component';
import { NumericFieldDirective } from './numeric-field/numeric-field.directive';


@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule.forRoot(),
    DecimalInputModule
  ],
  declarations: [
    GenericModalComponent,
    CollapsePanelComponent,
    NumericFieldDirective
  ],
  exports: [
    DecimalInputDirective,
    NgbDropdownModule,
    GenericModalComponent,
    CollapsePanelComponent,
    NumericFieldDirective
  ],
  entryComponents: [ GenericModalComponent ]
})
export class SharedUiModule { }
