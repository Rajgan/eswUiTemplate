import { ElementRef, Directive, OnInit, Input } from '@angular/core';
import { inherits } from 'util';
import { AuthContext } from '../auth-context.service';

@Directive({selector: '[eswRoleVisibility]'})
export class RoleVisibilityDirective implements OnInit {

    @Input('matchRole') matchRole: string;

    constructor(readonly element: ElementRef,
                private authService: AuthContext) {}

    ngOnInit() {
      const roles = this.authService.getRoles();
      this.authService.isAuthenticated$.subscribe((loggedIn => {
        this.element.nativeElement.style.display = (
          (roles.indexOf(this.matchRole) > -1 && loggedIn) ? 'inline' : 'none'
        );
      }));

    }
}
