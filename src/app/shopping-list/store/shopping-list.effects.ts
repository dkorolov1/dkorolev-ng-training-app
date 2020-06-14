import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, withLatestFrom, exhaustMap } from 'rxjs/operators';

import * as fromApp from 'src/app/store/app.reducer';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from './shopping-list.actions';
import * as AuthSelectors from 'src/app/auth/store/auth.selectors';

@Injectable()
export class ShoppingListEffects {
    constructor(
        private actions$: Actions,
        private shoppingListService: ShoppingListService,
        private store: Store<fromApp.AppState>) { }

    fetchIngredients = createEffect(
        () => this.actions$.pipe(
            ofType(ShoppingListActions.fetchIngredients),
            withLatestFrom(this.store.select(AuthSelectors.getAuthUser)),
            exhaustMap(([_, user]) => this.shoppingListService.fetchIngredients(user.id).pipe(
                map(ingredients => ShoppingListActions.fetchIngredientsSuccess({ ingredients }))
            ))
        ));

    addIngredient = createEffect(
        () => this.actions$.pipe(
            ofType(ShoppingListActions.addIngredients),
            withLatestFrom(this.store.select(AuthSelectors.getAuthUser)),
            exhaustMap(([action, user]) => this.shoppingListService.addIngredients(user.id, action.ingredients).pipe(
                map(ingredients => ShoppingListActions.addIngredientsSuccess({ ingredients }))
            ))
        ));

    updateIngredient = createEffect(
        () => this.actions$.pipe(
            ofType(ShoppingListActions.updateIngredient),
            withLatestFrom(this.store.select(AuthSelectors.getAuthUser)),
            exhaustMap(([action, user]) => this.shoppingListService.updateIngredient(user.id, action.ingredient).pipe(
                map(ingredient => ShoppingListActions.updateIngredientSuccess({ ingredient }))
            ))
        ));

    deleteIngredient = createEffect(
        () => this.actions$.pipe(
            ofType(ShoppingListActions.deleteIngredient),
            withLatestFrom(this.store.select(AuthSelectors.getAuthUser)),
            switchMap(([action, user]) => this.shoppingListService.deleteIngredient(user.id, action.id).pipe(
                map(() => ShoppingListActions.deleteIngredientSuccess({ id: action.id }))
            ))
        ));
}
