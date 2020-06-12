import * as AuthActions from './auth.actions';
import { User } from 'src/app/shared/models/user.model';

describe('Auth Actions', () => {
    const TEST_USER = new User('test@mail.com', '<id>', '<token>', new Date());
    const TEST_AUTH_PAYLOAD = { email: '<email>', password: '<password>' };

    it('should create an authSuccess action', () => {
        const action = AuthActions.authSuccess({ redirect: false, user: TEST_USER });
        expect({ ...action }).toEqual({
            type: '[Auth] AUTH_SUCCESS',
            redirect: false,
            user: TEST_USER
        });
    });

    it('should create an logInStart action', () => {
        const action = AuthActions.logIn(TEST_AUTH_PAYLOAD);
        expect({ ...action }).toEqual({
            type: '[Auth] LOGIN',
            email: TEST_AUTH_PAYLOAD.email,
            password: TEST_AUTH_PAYLOAD.password
      });
    });

    it('should create an signUpStart action', () => {
        const action = AuthActions.signUp(TEST_AUTH_PAYLOAD);
        expect({ ...action }).toEqual({
            type: '[Auth] SIGNUP',
            email: TEST_AUTH_PAYLOAD.email,
            password: TEST_AUTH_PAYLOAD.password
      });
    });

    it('should create an authFail action', () => {
        const payload = { error: '<AuthFailError>' };
        const action = AuthActions.authFail(payload);
        expect({ ...action }).toEqual({
            type: '[Auth] AUTH_FAIL',
            error: payload.error
      });
    });

    it('should create an clearError action', () => {
        const action = AuthActions.clearError();
        expect({ ...action }).toEqual({
            type: '[Auth] CLEAR_ERROR'
      });
    });

    it('should create an autoLogIn action', () => {
        const action = AuthActions.autoLogIn();
        expect({ ...action }).toEqual({
            type: '[Auth] AUTO_LOGIN'
      });
    });

    it('should create an logOut action', () => {
        const action = AuthActions.logOut();
        expect({ ...action }).toEqual({
            type: '[Auth] LOGOUT'
      });
    });
});
