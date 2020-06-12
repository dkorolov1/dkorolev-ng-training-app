import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { User } from '../shared/models/user.model';
import { environment } from 'src/environments/environment';
import { AuthData } from '../shared/models/authData.model';
import { FireBaseAuthService } from './firebase-auth.service';

const TEST_USER = new User('test@mail.com', '<id>', '<token>', new Date());
const TEST_AUTH_DATA: AuthData = {
    email: 'test@mail.com',
    idToken: '<token>',
    localId: '<id>',
    expiresIn: '0',
    refreshToken: '<refreshToken>',
};

describe('Auth Service', () => {
    let httpMock: HttpTestingController;
    let authService: FireBaseAuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [FireBaseAuthService],
        });

        authService = TestBed.inject(FireBaseAuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be defined', () => {
        expect(authService).toBeTruthy();
    });

    function testAuthSucccess(endpoint: string, authFunc: (email: string, password: string) => Observable<User>) {
        const email = '<email>';
        const password = '<pass>';
        authFunc(email, password).subscribe(result => {
            // tokenExpirationDate will be ignored (it's always different)
            const testUserCopy = {...TEST_USER};
            delete testUserCopy.tokenExpirationDate;
            expect(result).toEqual(jasmine.objectContaining(testUserCopy));
        });
        httpMock.expectOne(r => {
            const validMethod = r.method === 'POST';
            const validEndpoint = r.urlWithParams === endpoint;
            const validBody = r.body.email === email
                && r.body.password === password
                && r.body.returnSecureToken === true;
            return validMethod && validEndpoint && validBody;
        }).flush(TEST_AUTH_DATA);
    }

    function testAuthError(endpoint: string, authFunc: (email: string, password: string) => Observable<User>) {
        const email = '<email>';
        const password = '<pass>';
        authFunc(email, password).subscribe(() => {}, error =>
            expect(error).toBeInstanceOf(String)
        );
        httpMock.expectOne(r => {
            const validMethod = r.method === 'POST';
            const validEndpoint = r.urlWithParams === endpoint;
            const validBody = r.body.email === email
                && r.body.password === password
                && r.body.returnSecureToken === true;
            return validMethod && validEndpoint && validBody;
        }).flush({}, { status: 400, statusText: '' });
    }

    it('should make a http post request on login', () => {
        testAuthSucccess(environment.fbLogInWithEmailUrl, authService.logIn);
    });

    it('should make a http post request on sign up', () => {
        testAuthSucccess(environment.fbSignUpWithEmailUrl, authService.signUp);
    });

    it('should return a string on login error', () => {
        testAuthError(environment.fbLogInWithEmailUrl, authService.logIn);
    });

    it('should return a string on sign up error', () => {
        testAuthError(environment.fbSignUpWithEmailUrl, authService.signUp);
    });
});
