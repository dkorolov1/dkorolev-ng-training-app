import { Action } from '@ngrx/store';

import { Recipe } from 'src/app/shared/models/recipe.model';

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';

export const ADD_RECIPE = 'ADD_RECIPE';
export const ADD_RECIPE_SUCCESS = 'ADD_RECIPE_SUCCESS';

export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const UPDATE_RECIPE_SUCCESS = 'UPDATE_RECIPE_SUCCESS';

export const DELETE_RECIPE = 'DELETE_RECIPE';
export const DELETE_RECIPE_SUCCESS = 'DELETE_RECIPE_SUCCESS';

export class FetchRecipes implements Action {
    readonly type: string = FETCH_RECIPES;
}

export class FetchRecipesSuccess implements Action {
    readonly type: string = FETCH_RECIPES_SUCCESS;
    constructor(public payload: { [key: string]: Recipe; }) {}
}

export class AddRecipeSuccess implements Action {
    readonly type: string = ADD_RECIPE_SUCCESS;
    constructor(public payload: Recipe) {}
}

export class AddRecipe implements Action {
    readonly type: string = ADD_RECIPE;
    constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
    readonly type: string = UPDATE_RECIPE;
    constructor(public payload: Recipe) {}
}

export class UpdateRecipeSuccess implements Action {
    readonly type: string = UPDATE_RECIPE_SUCCESS;
    constructor(public payload: Recipe) {}
}

export class DeleteRecipe implements Action {
    readonly type: string = DELETE_RECIPE;
    constructor(public payload: string) {}
}

export class DeleteRecipeSuccess implements Action {
    readonly type: string = DELETE_RECIPE_SUCCESS;
    constructor(public payload: string) {}
}
