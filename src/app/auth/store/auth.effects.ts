import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, tap, exhaustMap } from 'rxjs/operators';

import * as AuthActions from '../store/auth.actions';
import { User } from 'src/app/shared/models/user.model';
import { AutoLogOutService } from '../auto-logout.service';
import { FireBaseAuthService } from '../firebase-auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private localStorageService: LocalStorageService,
        private autoLogOutService: AutoLogOutService,
        private fireBaseAuthService: FireBaseAuthService) { }

    logIn = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.logIn),
            exhaustMap(action => this.fireBaseAuthService.logIn(action.email, action.password).pipe(
                tap(this.handleAuth.bind(this)),
                map(user => AuthActions.authSuccess({ user, redirect: true })),
                catchError(error => of(AuthActions.authFail({ error })))
            ))
        )
    );

    signUp = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.signUp),
            exhaustMap(action => this.fireBaseAuthService.signUp(action.email, action.password).pipe(
                tap(this.handleAuth.bind(this)),
                map(user => AuthActions.authSuccess({ user, redirect: true })),
                catchError(error => of(AuthActions.authFail({ error })))
            ))
        )
    );

    autoLogIn = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.autoLogIn),
            map(this.localStorageService.restoreUser),
            map(user => {
                if (user) {
                    // token expiration in milliseconds
                    const tokenExpirationMs = new Date(user.tokenExpirationDate).getTime();
                    // current date in milliseconds
                    const currentDateMs = new Date().getTime();
                    // expiration duration in milliseconds
                    const expirationDurationMs = tokenExpirationMs - currentDateMs;
                    this.autoLogOutService.setAutoLogOutTimer(expirationDurationMs);
                    return AuthActions.authSuccess({ user, redirect: false });
                }
                return { type: '<EMPTY>' };
            })
        ));

    logOut = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.logOut),
            tap(() => {
                this.autoLogOutService.clearLogoutTimer();
                this.localStorageService.clearUserData();
                this.router.navigate(['/auth']);
            })
        ),
        { dispatch: false }
    );

    authRedirect = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.authSuccess),
            tap(action => {
                if (action.redirect) {
                    this.router.navigate(['/']);
                }
            })
        ),
        { dispatch: false }
    );

    private handleAuth(user: User) {
        this.localStorageService.setUser(user);
        this.autoLogOutService.setAutoLogOutTimer(user.tokenExpiresIn);
    }
}
