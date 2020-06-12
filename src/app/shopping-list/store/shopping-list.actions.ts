import { createAction, props } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/models/ingredient.model';

export const fetchIngredients = createAction(
    '[Shopping-List] FETCH_INGREDIENTS');

export const fetchIngredientsSuccess = createAction(
    '[Shopping-List] FETCH_INGREDIENTS_SUCCESS', props<{ ingredients: { [key: string]: Ingredient; } }>());

export const addIngredients = createAction(
    '[Shopping-List] ADD_INGREDIENTS', props<{ ingredients: Ingredient[] }>());

export const addIngredientsSuccess = createAction(
    '[Shopping-List] ADD_INGREDIENTS_SUCCESS', props<{ ingredients: { [key: string]: Ingredient; } }>());

export const updateIngredient = createAction(
    '[Shopping-List] UPDATE_INGREDIENT', props<{ ingredient: Ingredient }>());

export const updateIngredientSuccess = createAction(
    '[Shopping-List] UPDATE_INGREDIENT_SUCCESS', props<{ ingredient: Ingredient }>());

export const deleteIngredient = createAction(
    '[Shopping-List] DELETE_INGREDIENT', props<{ id: string }>());

export const deleteIngredientSuccess = createAction(
    '[Shopping-List] DELETE_INGREDIENT_SUCCESS', props<{ id: string }>());

export const startEditIngredient = createAction(
    '[Shopping-List] START_EDIT_INGREDIENT', props<{ id: string }>());

export const stopEditIngredient = createAction(
    '[Shopping-List] STOP_EDIT_INGREDIENT');
