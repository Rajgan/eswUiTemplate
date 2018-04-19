import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Feature2RoutingModule } from './feature2-routing.module';
import { Lazy3Component } from './lazy3/lazy3.component';
import { Lazy4Component } from './lazy4/lazy4.component';

@NgModule({
  imports: [
    CommonModule,
    Feature2RoutingModule
  ],
  declarations: [Lazy3Component, Lazy4Component]
})
export class Feature2Module { }
