import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { take, switchMap } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as ShoppingListSelectors from './store/shopping-list.selectors';

@Injectable({providedIn: 'root'})
export class ShoppingListResolverService implements Resolve<any> {
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) {}

    resolve() {
        return this.store.select(ShoppingListSelectors.getIngredientsCount).pipe(
            take(1),
            switchMap(count => {
                if (count === 0) {
                    this.store.dispatch(ShoppingListActions.fetchIngredients());
                    return this.actions$.pipe(
                        ofType(ShoppingListActions.fetchIngredientsSuccess),
                        take(1)
                    );
                } else {
                    return of(undefined);
                }
            })
        );
    }
}
