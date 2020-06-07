import { Action } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/models/ingredient.model';

export const STOP_EDIT = 'STOP_EDIT';
export const START_EDIT = 'START_EDIT';

export const FETCH_INGREDIENTS = 'FETCH_INGREDIENTS';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';

export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const ADD_INGREDIENTS_SUCCESS = 'ADD_INGREDIENTS_SUCCESS';

export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const UPDATE_INGREDIENT_SUCCESS = 'UPDATE_INGREDIENT_SUCCESS';

export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const DELETE_INGREDIENT_SUCCESS = 'DELETE_INGREDIENT_SUCCESS';

export class FetchIngredients implements Action {
    readonly type: string = FETCH_INGREDIENTS;
}

export class FetchIngredientsSuccess implements Action {
    readonly type: string = FETCH_INGREDIENTS_SUCCESS;
    constructor(public payload: { [key: string]: Ingredient; }) {}
}

export class AddIngredients implements Action {
    readonly type: string = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) {}
}

export class AddIngredientsSuccess implements Action {
    readonly type: string = ADD_INGREDIENTS_SUCCESS;
    constructor(public payload: { [key: string]: Ingredient; }) {}
}

export class UpdateIngredient implements Action {
    readonly type: string = UPDATE_INGREDIENT;
    constructor(public payload: Ingredient) {}
}

export class UpdateIngredientSuccess implements Action {
    readonly type: string = UPDATE_INGREDIENT_SUCCESS;
    constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
    readonly type: string = DELETE_INGREDIENT;
    constructor(public payload: string) {}
}

export class DeleteIngredientSuccess implements Action {
    readonly type: string = DELETE_INGREDIENT_SUCCESS;
    constructor(public payload: string) {}
}

export class StartEditIngredient implements Action {
    readonly type: string = START_EDIT;
    constructor(public payload: string) {}
}

export class StopEditIngredient implements Action {
    readonly type: string = STOP_EDIT;
}
