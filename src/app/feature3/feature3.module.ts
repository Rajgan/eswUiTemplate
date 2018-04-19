import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';

import { Eager1Component } from './eager1/eager1.component';
import { Feature3Component } from './feature3.component';

export const routes: Routes = [
  { path: '', redirectTo: 'eager', pathMatch: 'full' },
  { path: 'eager', component: Eager1Component }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    Eager1Component,
    Feature3Component
  ],
  exports: [
    Eager1Component,
    Feature3Component
  ]
})
export class Feature3Module { }
