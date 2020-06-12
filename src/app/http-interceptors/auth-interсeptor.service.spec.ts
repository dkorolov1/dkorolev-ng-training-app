import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { User } from '../shared/models/user.model';
import { getAuthUser } from '../auth/store/auth.selectors';
import { environment } from 'src/environments/environment';
import { RecipesService } from '../recipes/recipes.service';
import { AuthInterсeptorService } from './auth-interсeptor.service';

describe(`AuthHttpInterceptor`, () => {
    let recipesService: RecipesService;
    let httpMock: HttpTestingController;
    let store: MockStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                RecipesService,
                provideMockStore(),
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterсeptorService,
                    multi: true
                }
            ],
        });

        store = TestBed.inject(MockStore);
        recipesService = TestBed.inject(RecipesService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should add auth param to all outgoing request', () => {
        const tokenTestValue = '<test_token>';
        store.overrideSelector(getAuthUser, { token: tokenTestValue } as User);
        recipesService.getRecipes().subscribe(response => {
            expect(response).toBeTruthy();
        });
        const httpRequest = httpMock.expectOne(r =>
            r.url === `${environment.fireBaseDbUrl}/recipes.json`);
        expect(httpRequest.request.params.has('auth')).toEqual(true);
        expect(httpRequest.request.params.get('auth')).toBe(tokenTestValue);
    });
});
