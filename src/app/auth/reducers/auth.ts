import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserProfile } from './../userprofile.model';
import { AuthActionsUnion, AuthActionTypes } from '../actions/auth';

export interface AuthState {
    isLoggedIn: boolean;
    user: UserProfile;
    roles: Array<string>;
}

export const initialState: AuthState = {
    isLoggedIn: false,
    user: undefined,
    roles: []
};

export function reducer(state: AuthState = initialState, action: AuthActionsUnion): AuthState {
    switch (action.type) {
        case AuthActionTypes.Authorized:
            return Object.assign( {}, state, { isLoggedIn: true });
        case AuthActionTypes.SetUser:
            return Object.assign( {}, state, { isLoggedIn: true, user: action.payload.user });
        case AuthActionTypes.SetRoles:
            return Object.assign( {}, state, { isLoggedIn: true, user: state.user, roles: action.payload.roles });
        case AuthActionTypes.Logoff:
            return initialState;
        default:
            return state;
    }
}

export const AuthReducerFeature = 'authentication';
export const getAuthState = createFeatureSelector<AuthState>(AuthReducerFeature);

export const getUser = createSelector(getAuthState, (state: AuthState) => state.user);
export const getIsLoggedIn = createSelector(getAuthState, (state: AuthState) => state.isLoggedIn);
export const getRoles = createSelector(getAuthState, (state: AuthState) => state.roles);


