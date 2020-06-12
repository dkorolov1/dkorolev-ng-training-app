import * as AuthActions from './auth.actions';
import { User } from 'src/app/shared/models/user.model';
import { initialState, authReducer, AuthState } from './auth.reducer';

describe('Auth Reducer', () => {
    const TEST_INITIAL_STATE: AuthState = {
        user: null,
        loading: false,
        authError: null
    };

    it('should return initial state', () => {
        const action = {} as any;
        const state = authReducer(undefined, action);
        expect(state).toEqual(initialState);
    });

    it('should set loading to true on login start', () => {
        const action = AuthActions.logIn({ email: '', password: '' });
        const state = authReducer(TEST_INITIAL_STATE, action);
        expect(state.loading).toBe(true);
    });

    it('should set user on login success', () => {
        const user: User = new User('test@mail.com', '', '', new Date());
        const action = AuthActions.authSuccess({ user, redirect: false });
        const state = authReducer(TEST_INITIAL_STATE, action);
        expect(state.user.email).toBe('test@mail.com');
    });

    it('should set error on login fail', () => {
        const action = AuthActions.authFail({ error: '[Test] Auth error message' });
        const state = authReducer(TEST_INITIAL_STATE, action);
        expect(state.authError).toBe('[Test] Auth error message');
    });

    it('should set user to null on logout', () => {
        const state = authReducer(TEST_INITIAL_STATE, AuthActions.logOut());
        expect(state.user).toBeNull();
    });

    it('should set error to null on clear', () => {
        const state = authReducer(TEST_INITIAL_STATE, AuthActions.clearError());
        expect(state.authError).toBeNull();
    });
});
