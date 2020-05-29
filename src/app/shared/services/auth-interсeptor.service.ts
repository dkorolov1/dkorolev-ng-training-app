import { Injectable } from '@angular/core';
import { take, exhaustMap } from 'rxjs/operators';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterсeptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {};

    intercept(originalRequest: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
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