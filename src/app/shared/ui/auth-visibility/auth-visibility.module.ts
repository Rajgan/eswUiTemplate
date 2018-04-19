import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthHideDirective, AuthShowDirective } from './auth-visibility.directive';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ AuthHideDirective, AuthShowDirective ],
  exports: [ AuthHideDirective, AuthShowDirective ]
})
export class AuthVisibilityModule { }
