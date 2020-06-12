import { createAction, props } from '@ngrx/store';

import { Recipe } from 'src/app/shared/models/recipe.model';

export const fetchRecipes = createAction(
    '[Recipes] FETCH_RECIPES');

export const fetchRecipesSuccess = createAction('[Recipes] FETCH_RECIPES_SUCCESS',
    props<{ recipes: { [key: string]: Recipe; } }>());

export const addRecipe = createAction('[Recipes] ADD_RECIPE',
    props<{ recipe: Recipe; }>());

export const addRecipeSuccess = createAction('[Recipes] ADD_RECIPE_SUCCESS',
    props<{ recipe: Recipe; }>());

export const updateRecipe = createAction('[Recipes] UPDATE_RECIPE',
    props<{ recipe: Recipe; }>());

export const updateRecipeSuccess = createAction('[Recipes] UPDATE_RECIPE_SUCCESS',
    props<{ recipe: Recipe; }>());

export const deleteRecipe = createAction('[Recipes] DELETE_RECIPE',
    props<{ id: string; }>());

export const deleteRecipeSuccess = createAction('[Recipes] DELETE_RECIPE_SUCCESS',
    props<{ id: string; }>());
