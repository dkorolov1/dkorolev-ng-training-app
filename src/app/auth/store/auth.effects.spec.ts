import { Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { cold, hot } from 'jasmine-marbles';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { AuthEffects } from './auth.effects';
import { User } from 'src/app/shared/models/user.model';
import { AutoLogOutService } from '../auto-logout.service';
import { FireBaseAuthService } from '../firebase-auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { logIn, authSuccess, signUp, autoLogIn, logOut, authFail } from './auth.actions';

describe('Auth Effects', () => {
  const TEST_USER = new User('test@mail.com', '<id>', '<token>', new Date());

  let effects: AuthEffects;
  let actions$: Observable<Action>;

  let router: jasmine.SpyObj<Router>;
  let autoLogOutService: jasmine.SpyObj<AutoLogOutService>;
  let fireBaseAuthService: jasmine.SpyObj<FireBaseAuthService>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockStore(),
        provideMockActions( () => actions$ ),
        {
          provide: FireBaseAuthService,
          useValue: jasmine.createSpyObj('AuthService', [ 'logIn', 'signUp' ])
        },
        {
          provide: LocalStorageService,
          useValue: jasmine.createSpyObj('LocalStorageService', [ 'setUser', 'restoreUser', 'clearUserData' ])
        },
        {
          provide: AutoLogOutService,
          useValue: jasmine.createSpyObj('AutoLogOutService', [ 'setAutoLogOutTimer', 'clearLogoutTimer' ])
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        }
      ]
    });

    router = TestBed.inject<Router>(Router) as jasmine.SpyObj<Router>;
    autoLogOutService = TestBed.inject(AutoLogOutService) as jasmine.SpyObj<AutoLogOutService>;
    fireBaseAuthService = TestBed.inject(FireBaseAuthService) as jasmine.SpyObj<FireBaseAuthService>;
    localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;

    effects = TestBed.inject(AuthEffects);
  });

  describe('logIn', () => {
    it('should login and return a stream with auth success action', () => {
      const income = logIn({ email: TEST_USER.email, password: '<password>' });
      const outcome = authSuccess({ user: TEST_USER, redirect: true });

      actions$ = hot('-a', { a: income });
      const response = cold('-a|', { a: TEST_USER });
      fireBaseAuthService.logIn.and.returnValue(response);

      const expected = cold('--b', { b: outcome });
      expect(effects.logIn).toBeObservable(expected);
    });

    it('should fail on logging in and return an action with the error', () => {
      const income = logIn({ email: TEST_USER.email, password: '<password>' });
      const error = 'some login error';
      const outcome = authFail({error});

      actions$ = hot('-a', { a: income });
      const response = cold('-#|', {}, error);
      fireBaseAuthService.logIn.and.returnValue(response);

      const expected = cold('--b', { b: outcome });
      expect(effects.logIn).toBeObservable(expected);
    });
  });

  describe('signUp', () => {
    it('should sign up and return a stream with auth success action', () => {
      const income = signUp({ email: TEST_USER.email, password: '<password>' });
      const outcome = authSuccess({ user: TEST_USER, redirect: true });

      actions$ = hot('-a', { a: income });
      const response = cold('-a|', { a: TEST_USER });
      fireBaseAuthService.signUp.and.returnValue(response);

      const expected = cold('--b', { b: outcome });
      expect(effects.signUp).toBeObservable(expected);
    });

    it('should fail on signing up and return an action with the error', () => {
      const income = signUp({ email: TEST_USER.email, password: '<password>' });
      const error = 'some sign up error';
      const outcome = authFail({error});

      actions$ = hot('-a', { a: income });
      const response = cold('-#|', {}, error);
      fireBaseAuthService.signUp.and.returnValue(response);

      const expected = cold('--b', { b: outcome });
      expect(effects.signUp).toBeObservable(expected);
    });
  });

  describe('autoLogIn', () => {
    it('should do auto logging in and return auth success action', () => {
      actions$ = hot('-a', { a: autoLogIn() });
      localStorageService.restoreUser.and.returnValue(TEST_USER);

      const expected = cold('-b', { b: authSuccess({ user: TEST_USER, redirect: false }) });
      expect(effects.autoLogIn).toBeObservable(expected);
    });

    it('should return an empty action if auto log in is not possible', () => {
      actions$ = hot('-a', { a: autoLogIn() });
      localStorageService.restoreUser.and.returnValue(null);

      const expected = cold('-b', { b: { type: '<EMPTY>' } });
      expect(effects.autoLogIn).toBeObservable(expected);
    });
  });

  describe('logOut', () => {
    it('should clear auto log out timer', () => {
      actions$ = of(logOut());

      effects.logOut.subscribe();
      expect(autoLogOutService.clearLogoutTimer.calls.count()).toBe(1);
    });

    it('should clear user data in local storage', () => {
      actions$ = of(logOut());

      effects.logOut.subscribe();
      expect(localStorageService.clearUserData.calls.count()).toBe(1);
    });

    it('should redirect user to the auth page', () => {
      actions$ = of(logOut());

      effects.logOut.subscribe();
      expect(router.navigate).toHaveBeenCalledWith(['/auth']);
    });
  });
});
