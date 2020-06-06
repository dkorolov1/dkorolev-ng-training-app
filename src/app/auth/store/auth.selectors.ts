import { createSelector } from '@ngrx/store';

import { getAuthState } from './auth.reducer';

export const getAuthUser = createSelector(
    getAuthState,
    state => state.user
);

export const getAuthLoading = createSelector(
    getAuthState,
    state => state.loading
);

export const getAuthError = createSelector(
    getAuthState,
    state => state.authError
);
