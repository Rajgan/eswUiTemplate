import { reducer } from './auth';
import { AuthActionTypes, SetUser, Logoff, Authorized } from '../actions/auth';
import { UserProfile } from '../userprofile.model';

describe('Auth reducer', () => {
    const user = { Name: 'davy', FamilyName: 'jones', GivenName: 'davy jones' } as UserProfile;

    it('should return the initial state for Logoff', () => {
        expect(
            reducer(undefined,
                new Logoff()
            ))
            .toEqual(
                {
                    isLoggedIn: false,
                    user: undefined,
                    roles: []
                }
            );
    });

    it('should return the user for SetUser', () => {
        expect(
            reducer(undefined,
                new SetUser({user: user})
            )).toEqual(
                {
                    isLoggedIn: true,
                    user: user,
                    roles: []
                }
            );
    });

    it('should set loggedin to true for Authorized', () => {
        expect(
            reducer(undefined,
                new Authorized()
            )).toEqual(
                {
                    isLoggedIn: true,
                    user: undefined,
                    roles: []
                }
            );
    });
});
