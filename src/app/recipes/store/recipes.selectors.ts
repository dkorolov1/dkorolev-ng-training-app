import { createSelector } from '@ngrx/store';

import * as fromFeature from './recipes.reducer';
import * as fromApp from 'src/app/store/app.reducer';

const getRecipes = createSelector(
    fromFeature.getRecipesState,
    state => state.recipes
);

export const getAllRecipes = createSelector(
    getRecipes,
    recipes => Object.keys(recipes)
        .map(key => recipes[key])
);

export const getRecipesCount = createSelector(
    getRecipes,
    state => state.recipes
        ? Object.keys(state.recipes).length
        : 0,
);

export const getSelectedRecipe = createSelector(
    getRecipes,
    fromApp.getRouterState,
    (recipes, router) => router.state
        && recipes[router.state.params.recipeId]
);
