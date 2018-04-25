import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericModalService } from './../../shared/services/gernericmodal/genericmodal.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { TranslateService } from '@ngx-translate/core';
import { UserProfile } from '../../auth/userprofile.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth/reducers/auth';
import { Authorize, Logoff } from '../../auth/actions/auth';
import { getUser } from '../../auth/reducers/auth';
import { Observable } from 'rxjs/Observable';

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

  user$: Observable<UserProfile>;

  public constructor(
    private route: Router,
    private modalService: GenericModalService,
    private translateService: TranslateService,
    private store: Store<AuthState>) {
    this.router = route;
    this.user$ = this.store.select(getUser);
  }

  public notImplementedModal() {

    this.modalService.showWarning(
      this.translateService.instant('errors.notimplemented.title'),
      this.translateService.instant('errors.notimplemented.text')
    );
  }

  public logout() {
    this.store.dispatch(new Logoff());
  }

  public login() {
    this.store.dispatch(new Authorize());
  }
}
