import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from '../models/user.model';
import { AuthData } from '../models/authData';
import { environment } from 'src/environments/environment';

const USER_DATA_LOCAL_STORAGE_KEY = 'recipes-app-user-data';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    autoLogOutTimer: any;

    constructor(private httpClient: HttpClient, private router: Router) { };

    signUp(email: string, password: string) {
        return this.httpClient
            .post<AuthData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.fireBaseApiKey}`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            ).pipe(
                catchError(this.handleAuthError),
                tap(this.handleAuth.bind(this))
            );
    }

    logIn(email: string, password: string) {
        return this.httpClient
            .post<AuthData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.fireBaseApiKey}`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            ).pipe(
                catchError(this.handleAuthError),
                tap(this.handleAuth.bind(this))
            );
    }

    autoLogIn() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: Date
        } = JSON.parse(localStorage.getItem(USER_DATA_LOCAL_STORAGE_KEY));
        if(!userData) {
            return;
        }
        const loadedUser: User = new User(
            userData.email,
            userData.id,
            userData._token,
            userData._tokenExpirationDate
        );
        if (loadedUser.token) {
            this.user.next(loadedUser);
            // expiration duration in milliseconds
            const expirationDurationMs = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
            this.autoLogOut(expirationDurationMs);
        }
    }

    logOut() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem(USER_DATA_LOCAL_STORAGE_KEY);
        if(this.autoLogOutTimer) {
            clearTimeout(this.autoLogOutTimer);
        }
        this.autoLogOutTimer = null;
    }

    autoLogOut(expirationDuration: number) {
        this.autoLogOutTimer = 
            setTimeout(this.logOut.bind(this), expirationDuration);
    }

    private handleAuth(authData: AuthData) {
        // expiresIn in milliseconds
        const expiresInMs = +authData.expiresIn * 1000;
        const expirationDate: Date = new Date(new Date().getTime() + expiresInMs);
        const user: User = new User(
            authData.email,
            authData.localId,
            authData.idToken,
            expirationDate
        );
        this.user.next(user);
        this.autoLogOut(expiresInMs);
        localStorage.setItem(USER_DATA_LOCAL_STORAGE_KEY, JSON.stringify(user));
    }

    private handleAuthError(errorData: HttpErrorResponse) {
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
        return throwError(errorMessage);
    }
}