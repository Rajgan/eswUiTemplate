import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CoreModule, UnAuthenticatedOnlyGuard} from './core';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppCustomPreloader } from './app.custom.preloader';

import { routes as childRoutes, Feature3Module } from './feature3/feature3.module';
import { Feature3Component } from './feature3/feature3.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { AuthorizationGuard } from './auth/authorization.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: 'feature1',
    loadChildren: 'app/feature1/feature1.module#Feature1Module',
    data: { preload: true }
    // lazy loaded module for a feature.  The module uses the preload: true to compile the module ahead of time
  },
  {
    path: 'feature2',
    loadChildren: 'app/feature2/feature2.module#Feature2Module'
    // lazy loaded module for a feature.  The module is only loaded when the link 'feature2' is activated
  },
  {
    path: 'feature3',
    component: Feature3Component,
    children: childRoutes
    // eagerly loaded module.  This is loaded when the app bootstraps
  },
  {
    path: 'styleGuide',
    loadChildren: 'app/style-guide/style-guide.module#StyleGuideModule'
    // styleguide is lazy loaded
  },
  { path: 'styles', redirectTo: 'styleGuide' }, // Allow for styles route or styleGuide as route.
  { path: 'preferences', component: PreferencesComponent, canActivate: [AuthorizationGuard] },
  { path: '403', component: UnauthorizedComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'forbidden', component: UnauthorizedComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: AppCustomPreloader }),
    Feature3Module
  ],
  providers: [ AppCustomPreloader ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routedComponents = [ AppComponent, NotFoundComponent ];
