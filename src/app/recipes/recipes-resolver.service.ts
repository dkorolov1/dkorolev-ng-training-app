import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { take, switchMap } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import * as fromApp from 'src/app/store/app.reducer';
import * as fromRecipes from './store/recipes.selectors';
import * as RecipesActions from './store/recipes.actions';

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<any> {
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) {};
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromRecipes.getRecipesCount).pipe(
            take(1),
            switchMap(count => {
                if (count === 0) {
                    this.store.dispatch(new RecipesActions.FetchRecipes());
                    return this.actions$.pipe(
                        ofType(RecipesActions.FETCH_RECIPES_SUCCESS),
                        take(1)
                    );
                } else {
                    return of(undefined);
                }
            })
        );
    }
}