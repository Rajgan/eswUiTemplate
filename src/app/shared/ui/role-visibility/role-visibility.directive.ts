import { ElementRef, Directive, OnInit, Input } from '@angular/core';
import { UserProfileService } from './../../../auth/userprofile.service';
import { inherits } from 'util';

@Directive({selector: '[eswRoleVisibility]'})
export class RoleVisibilityDirective implements OnInit {

    @Input('matchRole') matchRole: string;

    constructor(readonly element: ElementRef, private userProfile: UserProfileService) { }

    ngOnInit() {
      this.showHide();
      this.userProfile.userLoggedOn.subscribe((newUser) => {
        this.showHide();
      });
    }

    private showHide(): void {
        this.element.nativeElement.style.display = (this.userProfile.hasRole(this.matchRole) ? 'inline' : 'none');
    }
}
