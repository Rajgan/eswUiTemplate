import {NgModule, ModuleWithProviders} from '@angular/core';
import {NGB_DROPDOWN_DIRECTIVES} from './ngbdropdown.directive';
import {NgbDropdownConfig} from './ngbdropdown.config';

@NgModule({declarations: NGB_DROPDOWN_DIRECTIVES, exports: NGB_DROPDOWN_DIRECTIVES})
export class NgbDropdownModule {
  static forRoot(): ModuleWithProviders { return {ngModule: NgbDropdownModule, providers: [NgbDropdownConfig]}; }
}
