import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from './store/auth.selectors';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<fromApp.AppState>) {}

    canActivate(): Observable<boolean | UrlTree>
    {
        return this.store.select(fromAuth.getAuthUser).pipe(
            take(1),
            map(user => {
                const auth: boolean = !!user;
                if (auth) {
                    return auth;
                } else {
                    return this.router.createUrlTree(['/auth']);
                }
            })
        );
    }
}
