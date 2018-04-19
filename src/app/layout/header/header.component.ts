import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericModalService } from './../../shared/services/gernericmodal/genericmodal.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { TranslateService } from '@ngx-translate/core';
import { UserProfileService } from '../../auth/userprofile.service';
import { UserProfile } from '../../auth/userprofile.model';

// Component that will contain the header html. Populates the <navigation></navigation> element.
@Component({
  moduleId: module.id,
  selector: 'eswHeader',
  exportAs: 'eswHeader',
  templateUrl: 'header.component.html',
})
export class HeaderComponent {

  public name: string = null;
  public router: Router;

  public constructor(
    private route: Router, private modalService: GenericModalService,
    private translateService: TranslateService, private userProfileService: UserProfileService) {
    this.router = route;
    userProfileService.userLoggedOn.subscribe((newProfile) => {
      if (newProfile != null) {
        this.name = newProfile.GivenName;
      }
    });
  }

  public notImplementedModal() {

    this.modalService.showWarning(
      this.translateService.instant('errors.notimplemented.title'),
      this.translateService.instant('errors.notimplemented.text')
    );
  }

  public logout() {
    this.userProfileService.logout();
  }

  public login() {
    this.userProfileService.login();
  }
}
