import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { User } from '../shared/models/user.model';
import { getAuthUser } from './store/auth.selectors';
import { AuthGuardService } from './auth-guard.service';

describe('Auth Guard Service', () => {
    let authGuardService: AuthGuardService;
    let store: MockStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                AuthGuardService,
                provideMockStore()
            ]
        });
        authGuardService = TestBed.inject<AuthGuardService>(AuthGuardService);
        store = TestBed.inject(MockStore);
    });

    it('should be created', () => {
        expect(authGuardService).toBeTruthy();
    });

    it('should return true if user is authenticated', (done) => {
        store.overrideSelector(getAuthUser, {} as User);
        authGuardService.canActivate().subscribe(canActivate => {
            expect(canActivate).toBe(true);
            done();
        });
    });

    it('should return false if user is not authenticated', (done) => {
        store.overrideSelector(getAuthUser, null);
        authGuardService.canActivate().subscribe(canActivate => {
            expect(canActivate).not.toBeTrue();
            done();
        });
    });
});
