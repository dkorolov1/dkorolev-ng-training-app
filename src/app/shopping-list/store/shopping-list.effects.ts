import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom, mergeMap } from 'rxjs/operators';

import * as fromApp from 'src/app/store/app.reducer';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import * as ShoppingListActions from './shopping-list.actions';
import * as AuthSelectors from 'src/app/auth/store/auth.selectors';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { forkJoin } from 'rxjs';

@Injectable()
export class ShoppingListEffects {
    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromApp.AppState>) {}

    @Effect()
    fetchIngredients = this.actions$.pipe(
        ofType(ShoppingListActions.FETCH_INGREDIENTS),
        withLatestFrom(this.store.select(AuthSelectors.getAuthUser)),
        switchMap(([, user]) => {
            const url = `${environment.fireBaseDbUrl}/sList/${user.id}.json`;
            return this.httpClient.get<{ [key: string]: Ingredient }>(url).pipe(
                map(ingredients => ingredients ? ingredients : {}),
                map(ingredients => Object.keys(ingredients).reduce((acc, key) => {
                    acc[key] = { ...ingredients[key], id: key };
                    return acc;
                }, {})),
                map(ingredients =>
                    new ShoppingListActions.FetchIngredientsSuccess(ingredients))
            );
        })
    );

    @Effect()
    addIngredient = this.actions$.pipe(
        ofType(ShoppingListActions.ADD_INGREDIENTS),
        withLatestFrom(this.store.select(AuthSelectors.getAuthUser)),
        switchMap(([action, user]: [ShoppingListActions.AddIngredients, User]) => {
            const url = `${environment.fireBaseDbUrl}/sList/${user.id}.json`;
            return forkJoin(
                action.payload.map(ingredient => {
                    return this.httpClient.post<{name: string}>(url, { ...ingredient }).pipe(
                        map(({ name }) => {
                            return {
                                [name]: {
                                    ...ingredient, id: name
                                }
                            };
                        })
                    );
                })
            ).pipe(
                map(ingredients => {
                    const collapsedIngredients = ingredients.reduce((acc, i) => {
                        acc = {...acc, ...i};
                        return acc;
                    }, {});
                    return new ShoppingListActions.AddIngredientsSuccess(collapsedIngredients);
                })
            );
        })
    );

    @Effect()
    updateIngredient = this.actions$.pipe(
        ofType(ShoppingListActions.UPDATE_INGREDIENT),
        withLatestFrom(this.store.select(AuthSelectors.getAuthUser)),
        mergeMap(([action, user]: [ShoppingListActions.UpdateIngredient, User]) => {
            const { id, ...ingredientData } = action.payload;
            const url = `${environment.fireBaseDbUrl}/sList/${user.id}/${id}.json`;
            return this.httpClient.put<Ingredient>(url, { ...ingredientData }).pipe(
                map(ingredient => {
                    return { ...ingredient, id: action.payload.id };
                }),
                map(ingredient =>
                    new ShoppingListActions.UpdateIngredientSuccess(ingredient)
                )
            );
        })
    );

    @Effect()
    deleteIngredient = this.actions$.pipe(
        ofType(ShoppingListActions.DELETE_INGREDIENT),
        withLatestFrom(this.store.select(AuthSelectors.getAuthUser)),
        switchMap(([action, user]: [ShoppingListActions.DeleteIngredient, User]) => {
            const url = `${environment.fireBaseDbUrl}/sList/${user.id}/${action.payload}.json`;
            return this.httpClient.delete<null>(url).pipe(
                map(() =>
                    new ShoppingListActions.DeleteIngredientSuccess(action.payload)
                )
            );
        })
    );
}
