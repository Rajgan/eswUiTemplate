import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule } from '@angular/router';
import { createTranslateLoader } from '../shared/utils/translationLoader';
import { UserProfileService } from '../auth/userprofile.service';
import { SharedUiModule } from '../shared/ui/shared-ui.module';
import { AuthVisibilityModule } from '../shared/ui/auth-visibility/auth-visibility.module';
import { RoleVisibiltyModule } from '../shared/ui/role-visibility/role-visibility.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({ loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] } }),
    RouterModule,
    AuthVisibilityModule,
    RoleVisibiltyModule
  ],
  declarations: [
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent
  ],
  providers: [
    UserProfileService
  ],
  exports: [
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
