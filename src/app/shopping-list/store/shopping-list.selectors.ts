import { createSelector } from '@ngrx/store';

import * as fromFeature from './shopping-list.reducer';

const getIngredients = createSelector(
    fromFeature.getShoppingListState,
    state => state.ingredients
);

export const getEditedIngredient = createSelector(
    fromFeature.getShoppingListState,
    state => {
        return {
            id: state.editedIngredientId,
            ...state.editedIngredient
        };
    }
);

export const getAllIngredients = createSelector(
    getIngredients,
    ingredients => {
        return Object.keys(ingredients)
            .map(key => ingredients[key]);
    }
);

export const getIngredientsCount = createSelector(
    getIngredients,
    ingredients => Object.keys(ingredients).length
);
