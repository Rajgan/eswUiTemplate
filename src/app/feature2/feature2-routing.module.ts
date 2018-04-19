import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Lazy3Component } from './lazy3/lazy3.component';
import { Lazy4Component } from './lazy4/lazy4.component';

const routes: Routes = [
  {
    path: 'lazy3',
    component: Lazy3Component
  },
  {
    path: 'lazy4',
    component: Lazy4Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Feature2RoutingModule { }
