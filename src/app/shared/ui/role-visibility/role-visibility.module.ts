import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleVisibilityDirective } from './role-visibility.directive';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ RoleVisibilityDirective ],
  exports: [ RoleVisibilityDirective ]
})
export class RoleVisibiltyModule { }
