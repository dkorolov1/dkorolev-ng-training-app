import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from './store/auth.selectors';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<fromApp.AppState>) {};

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree
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