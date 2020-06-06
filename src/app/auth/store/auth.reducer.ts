
import * as AuthActions from './auth.actions';
import { User } from 'src/app/shared/models/user.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    user: User;
    loading: boolean;
    authError: string;
}

const initialState: State = {
    user: null,
    loading: false,
    authError: null
};

export function authReducer(state = initialState, action: any) {
    switch (action.type) {
        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
            return {
                ...state,
                loading: true,
                authError: null
            }
        case AuthActions.AUTH_SUCCESS:
            return {
                loading: false,
                authError: null,
                user: action.payload.user
            }
        case AuthActions.AUTH_FAIL:
            return {
                user: null,
                loading: false,
                authError: action.payload
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }
        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            }
        default: return state;
    }
}

export const getAuthState =
    createFeatureSelector<State>('auth');

