import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';

import * as AuthActions from '../store/auth.actions';
import { User } from 'src/app/shared/models/user.model';
import { AuthData } from 'src/app/shared/models/authData';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

const USER_DATA_LOCAL_STORAGE_KEY = 'recipes-app-user-data';

const handleAuthentification = (authData: AuthData) => {
    const expiresInMs = +authData.expiresIn * 1000;
    const expirationDate: Date = new Date(new Date().getTime() + expiresInMs);
    const user: User = new User(
        authData.email,
        authData.localId,
        authData.idToken,
        expirationDate);
    localStorage.setItem(USER_DATA_LOCAL_STORAGE_KEY, JSON.stringify(user));
    return new AuthActions.AuthSuccess({ user, redirect: true });
};

const handleError = (errorData: any) => {
    let errorMessage = 'An unexpected error occured.';
    if (errorData.error && errorData.error.error) {
        switch (errorData.error.error.message) {
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password.';
                break;
            case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled by an administrator.';
            case 'EMAIL_EXISTS':
                errorMessage = 'The email address is already in use by another account.';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Password sign-in is disabled for this project.';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'All requests from this device have been blocked due to unusual activity. Please try again later.';
        }
    }
    return of(new AuthActions.AuthFail(errorMessage));
}

@Injectable()
export class AuthEffects {
    constructor(
        private authService: AuthService,
        private router: Router,
        private httpClient: HttpClient,
        private actions$: Actions) { };

    setAutoLogOutTimer(d: number) {
        this.authService
            .setAutoLogOutTimer(d);
    }

    @Effect()
    authLogIn = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LogInStart) => {
            return this.httpClient
                .post<AuthData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.fireBaseApiKey}`,
                    {
                        returnSecureToken: true,
                        email: authData.payload.email,
                        password: authData.payload.password
                    }
                ).pipe(
                    tap((authData) => this.setAutoLogOutTimer(+authData.expiresIn * 1000)),
                    map(handleAuthentification),
                    catchError(handleError)
                );
        })
    );

    @Effect({
        dispatch: false
    })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTH_SUCCESS),
        tap((authSuccessAction: AuthActions.AuthSuccess) => {
            if (authSuccessAction.payload.redirect)
                this.router.navigate(['/'])
        })
    );

    @Effect({
        dispatch: false
    })
    logOutRedirect = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() =>
            this.router.navigate(['/auth'])
        )
    );

    @Effect()
    sihnUp = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((authData: AuthActions.SignUpStart) => {
            return this.httpClient
                .post<AuthData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.fireBaseApiKey}`,
                    {
                        returnSecureToken: true,
                        email: authData.payload.email,
                        password: authData.payload.password
                    }
                )
                .pipe(
                    tap((authData) => this.setAutoLogOutTimer(+authData.expiresIn * 1000)),
                    map(handleAuthentification),
                    catchError(handleError)
                );
        })
    );

    @Effect({
        dispatch: false
    })
    authLogOut = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem(USER_DATA_LOCAL_STORAGE_KEY);
        })
    )

    @Effect()
    autoLogIn = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: Date
            } = JSON.parse(localStorage.getItem(USER_DATA_LOCAL_STORAGE_KEY));
            if (userData && userData._token) {
                const user: User = new User(
                    userData.email,
                    userData.id,
                    userData._token,
                    userData._tokenExpirationDate
                );
                // token expiration in milliseconds
                const tokenExpirationMs = new Date(userData._tokenExpirationDate).getTime();
                // current date in milliseconds
                const currentDateMs = new Date().getTime();
                // expiration duration in milliseconds
                const expirationDurationMs = tokenExpirationMs - currentDateMs;
                this.setAutoLogOutTimer(expirationDurationMs);
                return new AuthActions.AuthSuccess({ user, redirect: false });
            }
            return { type: '<EMPTY>' };
        })
    )
}