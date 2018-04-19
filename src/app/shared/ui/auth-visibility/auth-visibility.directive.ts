import { ElementRef, Directive, OnInit } from '@angular/core';
import { UserProfileService } from './../../../auth/userprofile.service';
import { inherits } from 'util';

@Directive({selector: '[eswAuthShow]'})
export class AuthShowDirective implements OnInit {

    constructor(readonly element: ElementRef, private userProfile: UserProfileService) { }

    ngOnInit() {
        this.showHide();
        this.userProfile.userLoggedOn.subscribe((newUser) => {
            this.showHide();
        });
    }

    private showHide(): void {
        this.element.nativeElement.style.display = (this.userProfile.isAuthorized ? 'inline' : 'none');
    }
}

@Directive({selector: '[eswAuthHide]'})
export class AuthHideDirective implements OnInit {

    constructor(readonly element: ElementRef, private userProfile: UserProfileService) { }

    ngOnInit() {
        this.showHide();
        this.userProfile.userLoggedOn.subscribe((newUser) => {
            this.showHide();
        });
    }

    private showHide(): void {
        this.element.nativeElement.style.display = (!this.userProfile.isAuthorized ? 'inline' : 'none');
    }
}
