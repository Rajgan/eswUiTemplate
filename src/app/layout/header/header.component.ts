import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericModalService } from './../../shared/services/gernericmodal/genericmodal.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { TranslateService } from '@ngx-translate/core';
import { UserProfile } from '../../auth/userprofile.model';
import { AuthContext } from '../../auth/auth-context.service';

// Component that will contain the header html. Populates the <navigation></navigation> element.
@Component({
  moduleId: module.id,
  selector: 'eswHeader',
  exportAs: 'eswHeader',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit {

  public name: string = null;
  public router: Router;

  public constructor(
    private route: Router,
    private modalService: GenericModalService,
    private translateService: TranslateService,
    private authService: AuthContext) {
      this.router = route;
  }

  ngOnInit() {
    this.authService.userInfo$.subscribe((user) => {
      if (user != null) {
        this.name = user.GivenName;
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
    this.authService.logoff();
  }

  public login() {
    this.authService.logIn();
  }
}
