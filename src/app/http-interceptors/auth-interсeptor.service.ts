import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { take, exhaustMap } from 'rxjs/operators';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';

import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.selectors';

@Injectable()
export class AuthInterсeptorService implements HttpInterceptor {
    constructor(
        private store: Store<fromApp.AppState>
    ) {}

    intercept(originalRequest: HttpRequest<any>, next: HttpHandler) {
        return this.store.select(fromAuth.getAuthUser).pipe(
            take(1),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(originalRequest);
                }
                const modifiedRequest = originalRequest.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedRequest);
            })
        );
    }
}
