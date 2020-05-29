import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {};

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree
    {
        return this.authService.user.pipe(
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