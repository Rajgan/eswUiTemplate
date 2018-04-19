import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalInputDirective } from './decimalinput.directive';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ DecimalInputDirective ],
  exports: [ DecimalInputDirective ]
})
export class DecimalInputModule { }
