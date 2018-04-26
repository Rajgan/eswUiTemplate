import { AuthState, getIsLoggedIn } from './../../../auth/reducers/auth';
import { ElementRef, Directive, OnInit } from '@angular/core';
import { inherits } from 'util';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Directive({selector: '[eswAuthShow]'})
export class AuthShowDirective implements OnInit {

    isLoggedIn$: Observable<boolean>;

    constructor(readonly element: ElementRef,
                private store: Store<AuthState>) {
                    this.isLoggedIn$ = this.store.select(getIsLoggedIn);
                 }

    ngOnInit() {
        this.isLoggedIn$.subscribe(
            (isLoggedIn) => {
                this.element.nativeElement.style.display = (isLoggedIn ? 'inline' : 'none');
            }
        );
    }
}

@Directive({selector: '[eswAuthHide]'})
export class AuthHideDirective implements OnInit {

    isLoggedIn$: Observable<boolean>;

    constructor(readonly element: ElementRef,
                private store: Store<AuthState>) {
                    this.isLoggedIn$ = this.store.select(getIsLoggedIn);
                 }

    ngOnInit() {
        this.isLoggedIn$.subscribe(
            (isLoggedIn) => {
                this.element.nativeElement.style.display = (!isLoggedIn ? 'inline' : 'none');
            }
        );
    }
}
