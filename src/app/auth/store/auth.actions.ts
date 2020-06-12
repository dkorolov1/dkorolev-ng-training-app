import { createAction, props } from '@ngrx/store';

import { User } from 'src/app/shared/models/user.model';

export const authSuccess = createAction(
    '[Auth] AUTH_SUCCESS', props<{ user: User, redirect: boolean }>());

export const signUp = createAction(
    '[Auth] SIGNUP', props<{ email: string; password: string }>());

export const logIn = createAction(
    '[Auth] LOGIN', props<{ email: string; password: string }>());

export const authFail = createAction(
    '[Auth] AUTH_FAIL', props<{ error: string }>());

export const clearError = createAction(
    '[Auth] CLEAR_ERROR');

export const autoLogIn = createAction(
    '[Auth] AUTO_LOGIN');

export const logOut = createAction(
    '[Auth] LOGOUT');
