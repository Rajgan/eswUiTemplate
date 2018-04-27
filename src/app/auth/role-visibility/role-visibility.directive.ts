import { ElementRef, Directive, OnInit, Input } from '@angular/core';
import { inherits } from 'util';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthState, getIsLoggedIn, getRoles } from '../reducers/auth';

@Directive({selector: '[eswRoleVisibility]'})
export class RoleVisibilityDirective implements OnInit {

    isLoggedIn$: Observable<boolean>;
    roles$: Observable<Array<string>>;
    @Input('matchRole') matchRole: string;

    constructor(readonly element: ElementRef,
                private store: Store<AuthState>) {
                  this.isLoggedIn$ = this.store.select(getIsLoggedIn);
                  this.roles$ = this.store.select(getRoles);
                }

    ngOnInit() {
      let roles: Array<string>;
      this.roles$.subscribe(r => roles = r);
      this.isLoggedIn$.subscribe(
        (isLoggedIn) => {
          this.element.nativeElement.style.display = (roles.indexOf(this.matchRole) > -1 ? 'inline' : 'none');
        }
      );
    }
}
