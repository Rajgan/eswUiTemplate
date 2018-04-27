import { ElementRef, Directive, OnInit } from '@angular/core';
import { inherits } from 'util';
import { AuthContext } from '../auth-context.service';

@Directive({selector: '[eswAuthShow]'})
export class AuthShowDirective implements OnInit {

    isloggedIn: boolean;

    constructor(readonly element: ElementRef,
                private authService: AuthContext) { }

    ngOnInit() {
        this.authService.isAuthenticated$.subscribe((loggedIn) => {
            this.element.nativeElement.style.display = (loggedIn ? 'inline' : 'none');
        });
    }
}

@Directive({selector: '[eswAuthHide]'})
export class AuthHideDirective implements OnInit {

    constructor(readonly element: ElementRef,
                private authService: AuthContext) { }

    ngOnInit() {
        this.authService.isAuthenticated$.subscribe((loggedIn) => {
            this.element.nativeElement.style.display = (!loggedIn ? 'inline' : 'none');
        });
    }
}
