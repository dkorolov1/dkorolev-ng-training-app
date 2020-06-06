import { createFeatureSelector } from '@ngrx/store';

import * as RecipesActions from './recipes.actions';
import { Recipe } from 'src/app/shared/models/recipe.model';

export interface State {
    recipes: { [key: string]: Recipe; }
}

const initialState: State = {
    recipes: {}
}

export function recipesReducer(state = initialState, action: any) {
    switch(action.type) {
        case RecipesActions.FETCH_RECIPES_SUCCESS: {
            return {
                ...state,
                recipes: {...action.payload}
            }
        }
        case RecipesActions.ADD_RECIPE_SUCCESS:
        case RecipesActions.UPDATE_RECIPE_SUCCESS: {
            return {
                ...state,
                recipes: {
                    ...state.recipes, 
                    [action.payload.id]: {...action.payload}
                }
            }
        }
        case RecipesActions.DELETE_RECIPE_SUCCESS: {
            const newRecipes = {...state.recipes};
            delete newRecipes[action.payload];
            return {
                ...state,
                recipes: newRecipes
            }
        }
        default: return state;
    }
}

export const getRecipesState =
    createFeatureSelector<State>('recipes');