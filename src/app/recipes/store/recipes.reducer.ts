import { createFeatureSelector, Action, createReducer, on } from '@ngrx/store';

import * as RecipesActions from './recipes.actions';
import { Recipe } from 'src/app/shared/models/recipe.model';

export interface RecipesState {
    recipes: { [key: string]: Recipe; };
}

const initialState: RecipesState = {
    recipes: {}
};

const reducer = createReducer(
    initialState,
    on(RecipesActions.fetchRecipesSuccess, (state, { recipes }) => ({
        ...state,
        recipes
    })),
    on(RecipesActions.addRecipeSuccess, RecipesActions.updateRecipeSuccess, (state, { recipe }) => ({
        ...state,
        recipes: {
            ...state.recipes,
            [recipe.id]: {...recipe}
        }
    })),
    on(RecipesActions.deleteRecipeSuccess, (state, { id }) => {
        const newRecipes = {...state.recipes};
        delete newRecipes[id];
        return {
            ...state,
            recipes: newRecipes
        };
    })
);

export function recipesReducer(
    state: RecipesState | undefined,
    action: Action
): RecipesState {
    return reducer(state, action);
}

export const getRecipesState =
    createFeatureSelector<RecipesState>('recipes');
