import { createFeatureSelector, Action, on, createReducer } from '@ngrx/store';

import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/models/ingredient.model';

export interface ShoppingListState {
    editedIngredient: Ingredient;
    editedIngredientId: string;
    ingredients: { [key: string]: Ingredient; };
}

const initialState: ShoppingListState = {
    ingredients: {},
    editedIngredient: null,
    editedIngredientId: null
};

const reducer = createReducer(
    initialState,
    on(ShoppingListActions.fetchIngredientsSuccess, (state, { ingredients }) => ({
        ...state,
        ingredients
    })),
    on(ShoppingListActions.addIngredientsSuccess, (state, { ingredients }) => ({
        ...state,
        ingredients: {
            ...state.ingredients, ...ingredients
        }
    })),
    on(ShoppingListActions.updateIngredientSuccess, (state, { ingredient }) => {
        const { id, ...ingredientData } = ingredient;
        return {
            ...state,
            ingredients: {
                ...state.ingredients, [id]: ingredientData
            }
        };
    }),
    on(ShoppingListActions.deleteIngredientSuccess, (state, { id }) => {
        const newIngredients = { ...state.ingredients };
        delete newIngredients[id];
        return {
            ...state,
            ingredients: { ...newIngredients },
            editedIngredient: null,
            editedIngredientId: null
        };
    }),
    on(ShoppingListActions.startEditIngredient, (state, { id }) => ({
        ...state,
        editedIngredientId: id,
        editedIngredient: { id, ...state.ingredients[id] }
    })),
    on(ShoppingListActions.stopEditIngredient, (state) => ({
        ...state,
        editedIngredient: null,
        editedIngredientId: null
    })),
);

export function shoppingListReducer(
    state: ShoppingListState | undefined,
    action: Action
): ShoppingListState {
    return reducer(state, action);
}

export const getShoppingListState =
    createFeatureSelector<ShoppingListState>('shoppingList');
