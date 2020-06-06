import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from "@angular/core";
import { Actions, ofType } from '@ngrx/effects';
import { take, switchMap } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import * as fromApp from '../store/app.reducer';
import * as ShoppingListSelectors from './store/shopping-list.selectors';
import * as ShoppingListActions from './store/shopping-list.actions';

@Injectable({providedIn: 'root'})
export class ShoppingListResolverService implements Resolve<any> {
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) {};
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(ShoppingListSelectors.getIngredientsCount).pipe(
            take(1),
            switchMap(count => {
                if (count === 0) {
                    this.store.dispatch(new ShoppingListActions.FetchIngredients());
                    return this.actions$.pipe(
                        ofType(ShoppingListActions.FETCH_INGREDIENTS_SUCCESS),
                        take(1)
                    );
                } else {
                    return of(undefined);
                }
            })
        );
    }
}