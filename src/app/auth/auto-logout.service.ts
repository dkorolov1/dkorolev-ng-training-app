import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({
    providedIn: 'root'
})
export class AutoLogOutService {
    tokenExpirationTimer: any;

    constructor(private store: Store<fromApp.AppState>) {}

    setAutoLogOutTimer(expirationDurationMs: number) {
        this.tokenExpirationTimer =
            setTimeout(() => {
                this.store.dispatch(AuthActions.logOut());
            }, expirationDurationMs);
    }

    clearLogoutTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }
}
