import { createFeatureSelector, createReducer, on, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { User } from 'src/app/shared/models/user.model';

export interface AuthState {
    user: User;
    loading: boolean;
    authError: string;
}

export const initialState: AuthState = {
    user: null,
    loading: false,
    authError: null
};

const reducer = createReducer(
    initialState,
    on(AuthActions.logIn, AuthActions.signUp, state => ({
        ...state,
        loading: true
    })),
    on(AuthActions.authSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false,
        authError: null
    })),
    on(AuthActions.authFail, (state, { error }) => ({
        ...state,
        user: null,
        loading: false,
        authError: error
    })),
    on(AuthActions.logOut, state => ({
        ...state,
        user: null
    })),
    on(AuthActions.clearError, state => ({
        ...state,
        authError: null
    }))
);

export function authReducer(
    state: AuthState | undefined,
    action: Action
): AuthState {
    return reducer(state, action);
}

export const getAuthState =
    createFeatureSelector<AuthState>('auth');
