import { Action } from '@ngrx/store';

import { User } from 'src/app/shared/models/user.model';

export const LOGOUT = 'LOGOUT';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTO_LOGIN = 'AUTO_LOGIN';
export const LOGIN_START = 'LOGIN_START';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const SIGNUP_START = 'SIGNUP_START';

export class AuthSuccess implements Action {
    readonly type: string = AUTH_SUCCESS;
    constructor(public payload: { user: User, redirect: boolean }) {};
}

export class LogOut implements Action {
    readonly type: string = LOGOUT;
}

export class LogInStart implements Action {
    readonly type: string = LOGIN_START;
    constructor(public payload: { email: string; password: string }) {}
}

export class AuthFail implements Action {
    readonly type: string = AUTH_FAIL;
    constructor(public payload: string) {}
}

export class SignUpStart implements Action {
    readonly type: string = SIGNUP_START;
    constructor(public payload: { email: string; password: string }) {}
}

export class ClearError implements Action {
    readonly type: string = CLEAR_ERROR;
}

export class AutoLogIn implements Action {
    readonly type: string = AUTO_LOGIN;
}