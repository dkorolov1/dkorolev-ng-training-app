import { createFeatureSelector } from '@ngrx/store';

import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/models/ingredient.model';

export interface State {
    editedIngredient: Ingredient;
    editedIngredientId: string;
    ingredients: { [key: string]: Ingredient; };
}

const initialState: State = {
    ingredients: {},
    editedIngredient: null,
    editedIngredientId: null
};

export function shoppingListReducer(state = initialState, action: any): State {
    switch (action.type) {
        case ShoppingListActions.FETCH_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: {
                    ...action.payload
                }
            };
        case ShoppingListActions.ADD_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients, ...action.payload
                }
            };
        case ShoppingListActions.UPDATE_INGREDIENT_SUCCESS:
            const { id, ...recipeData } = action.payload;
            return {
                ...state,
                ingredients: {
                    ...state.ingredients, [id]: recipeData
                }
            };
        case ShoppingListActions.DELETE_INGREDIENT_SUCCESS:
            const newIngredients = {...state.ingredients};
            delete newIngredients[action.payload];
            return {
                ...state,
                ingredients: {...newIngredients},
                editedIngredient: null,
                editedIngredientId: null
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientId: action.payload,
                editedIngredient: {id: action.payload, ...state.ingredients[action.payload]}
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientId: null
            };
        default: return state;
    }
}

export const getShoppingListState =
    createFeatureSelector<State>('shoppingList');
