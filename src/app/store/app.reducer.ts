import { Params } from '@angular/router';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipes.reducer';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

export interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
}

export interface AppState {
    // features
    auth: fromAuth.AuthState;
    recipes: fromRecipes.RecipesState;
    shoppingList: fromShoppingList.ShoppingListState;
    // routing
    router: RouterReducerState<RouterStateUrl>;
}

export const appReducer: ActionReducerMap<AppState> = {
    router: routerReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipes.recipesReducer,
    shoppingList: fromShoppingList.shoppingListReducer
};

export const getRouterState =
    createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
