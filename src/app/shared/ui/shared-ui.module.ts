import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalInputDirective } from './decimalinput/decimalinput.directive';
import { NgbDropdownModule } from './dropdown/ngbdropdown.module';
import { NgbDropdownToggle } from './dropdown/ngbdropdown.directive';
import { GenericModalComponent } from './genericmodal/genericmodal.component';
import { CollapsePanelComponent } from './collapsePanel/collapsePanel.component';
import { NumericFieldDirective } from './numeric-field/numeric-field.directive';



@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule.forRoot()
  ],
  declarations: [
    GenericModalComponent,
    CollapsePanelComponent,
    NumericFieldDirective,
    DecimalInputDirective
  ],
  exports: [
    DecimalInputDirective,
    NgbDropdownModule,
    GenericModalComponent,
    CollapsePanelComponent,
    NumericFieldDirective,
    DecimalInputDirective
  ],
  entryComponents: [ GenericModalComponent ]
})
export class SharedUiModule { }
