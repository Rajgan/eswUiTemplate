import { AuthActionTypes, Logoff, SetUser, Authorize, Authorized, SetRoles } from './../actions/auth';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthContext } from '../auth-context.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../reducers/auth';
import { getIsLoggedIn } from '../../auth/reducers/auth';
import { switchMap, filter, tap, map, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
    @Effect({ dispatch: false })
        authorize$ = this.actions$.ofType(AuthActionTypes.Authorize)
            .pipe(
                tap(() => this.authCtx.logIn())
        );

    @Effect()
        authorized$ = this.actions$.ofType(AuthActionTypes.Authorized)
            .pipe(
                switchMap(() => this.authCtx.userInfo$
                    .pipe(
                        map(user => new SetUser({ user }))
                    )
                ),
                tap(() => new SetRoles({ roles: this.authCtx.getRoles() }))
        );

    @Effect({ dispatch: false})
        logoff$ = this.actions$.ofType(AuthActionTypes.Logoff)
            .pipe(
                tap(() => this.authCtx.logoff())
        );

    constructor(private actions$: Actions, private authCtx: AuthContext, private store: Store<AuthState>) {}
}
