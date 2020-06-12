import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { User } from '../shared/models/user.model';
import { AuthData } from '../shared/models/authData.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FireBaseAuthService {
    constructor(private httpClient: HttpClient) { }

    private toErrorMesage(errorObject: any) {
        let message = '';
        if (errorObject.error && errorObject.error.error) {
            switch (errorObject.error.error.message) {
                case 'EMAIL_NOT_FOUND':
                    message = 'There is no user record corresponding to this identifier. The user may have been deleted.';
                    break;
                case 'INVALID_PASSWORD':
                    message = 'The password is invalid or the user does not have a password.';
                    break;
                case 'USER_DISABLED':
                    message = 'The user account has been disabled by an administrator.';
                    break;
                case 'EMAIL_EXISTS':
                    message = 'The email address is already in use by another account.';
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    message = 'Password sign-in is disabled for this project.';
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    message = 'All requests from this device have been blocked due to unusual activity. Please try again later.';
                    break;
                default:
                    message = 'An unexpected error occured:' + errorObject.error.error.message;
            }
        }
        return message;
    }

    private toUser = (authData: AuthData) => new User(
        authData.email,
        authData.localId,
        authData.idToken,
        new Date(new Date().getTime() + +authData.expiresIn * 1000)
    )

    private auth = (email: string, password: string, endpoint: string) =>
        this.httpClient.post<AuthData>(endpoint, {
            email,
            password,
            returnSecureToken: true
        }).pipe(
            map(this.toUser),
            catchError(e => throwError(this.toErrorMesage(e)))
        )

    logIn = (email: string, password: string) =>
        this.auth(email, password, environment.fbLogInWithEmailUrl)

    signUp = (email: string, password: string) =>
        this.auth(email, password, environment.fbSignUpWithEmailUrl)
}
