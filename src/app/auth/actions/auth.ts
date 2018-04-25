import { Action } from '@ngrx/store';
import { UserProfile } from '../userprofile.model';

export enum AuthActionTypes {
    Logoff = '[Auth] Logoff',
    Authorize = '[Auth] Authorize',
    Authorized = '[Auth] Authorized',
    SetUser = '[Auth] SetUser'
}

export class Authorize implements Action {
    readonly type = AuthActionTypes.Authorize;
}

export class Authorized implements Action {
    readonly type = AuthActionTypes.Authorized;
}

export class SetUser implements Action {
    readonly type = AuthActionTypes.SetUser;

    constructor(public payload: { user: UserProfile }) {
        // console.log(payload.user);
    }
}

export class Logoff implements Action {
    readonly type = AuthActionTypes.Logoff;
}


export type AuthActionsUnion =
    Logoff |
    Authorize |
    Authorized |
    SetUser;
