import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { logOut } from './store/auth.actions';
import { AutoLogOutService } from './auto-logout.service';

describe('Auth Logout Service', () => {
    let store: MockStore;
    let autoLogOutService: AutoLogOutService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AutoLogOutService,
                provideMockStore()
            ]
        });
        autoLogOutService = TestBed.inject<AutoLogOutService>(AutoLogOutService);
        store = TestBed.inject(MockStore);
    });

    it('should dispatch a logOut action after the token expires', fakeAsync(() => {
        spyOn(store, 'dispatch');
        autoLogOutService.setAutoLogOutTimer(100);
        expect(store.dispatch).toHaveBeenCalledTimes(0);
        tick(100);
        expect(store.dispatch).toHaveBeenCalledWith(logOut());
    }));

    it('should clear the timer', () => {
        autoLogOutService.setAutoLogOutTimer(10000);
        autoLogOutService.clearLogoutTimer();
        expect(autoLogOutService.tokenExpirationTimer).toBeNull();
    });
});
