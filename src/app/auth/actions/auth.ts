import { Action } from '@ngrx/store';
import { UserProfile } from '../userprofile.model';

export enum AuthActionTypes {
    Logoff = '[Auth] Logoff',
    Authorize = '[Auth] Authorize',
    Authorized = '[Auth] Authorized',
    SetUser = '[Auth] SetUser',
    SetRoles = '[Auth] SetRoles'
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
    }
}

export class SetRoles implements Action {
    readonly type = AuthActionTypes.SetRoles;

    constructor(public payload: { roles: Array<string> }) {
    }
}

export class Logoff implements Action {
    readonly type = AuthActionTypes.Logoff;
}


export type AuthActionsUnion =
    Logoff |
    Authorize |
    Authorized |
    SetUser |
    SetRoles;
