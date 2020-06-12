import { User } from 'src/app/shared/models/user.model';
import { getAuthUser, getAuthLoading, getAuthError } from './auth.selectors';

describe('Auth Selectors', () => {
    const state = {
        auth: {
            user: new User('test@mail.com', '<id>', '<token>', new Date()),
            loading: false,
            authError: 'some error message'
        },
        router: {} as any,
        recipes: {} as any,
        shoppingList: {} as any
    };

    it('should return user', () => {
        expect(getAuthUser(state)).toBe(state.auth.user);
    });

    it('should return loading', () => {
        expect(getAuthLoading(state)).toBe(state.auth.loading);
    });

    it('should return auth error', () => {
        expect(getAuthError(state)).toBe(state.auth.authError);
    });
});