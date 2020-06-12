import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import * as RecipesActions from './recipes.actions';
import { RecipesService } from '../recipes.service';

@Injectable()
export class RecipesEffects {
    constructor(
        private actions$: Actions,
        private recipesService: RecipesService) { }

    fetchRecipes = createEffect(
        () => this.actions$.pipe(
            ofType(RecipesActions.fetchRecipes),
            switchMap(() =>
                this.recipesService.getRecipes().pipe(
                    map(recipes => RecipesActions.fetchRecipesSuccess({ recipes }))
                )
            )
        ));

    addRecipe = createEffect(
        () => this.actions$.pipe(
            ofType(RecipesActions.addRecipe),
            switchMap(action =>
                this.recipesService.addRecipe(action.recipe).pipe(
                    map(recipe => RecipesActions.addRecipeSuccess({ recipe }))
                )
            )
        ));

    updateRecipe = createEffect(
        () => this.actions$.pipe(
            ofType(RecipesActions.updateRecipe),
            switchMap(action =>
                this.recipesService.updateRecipe(action.recipe).pipe(
                    map(recipe => RecipesActions.updateRecipeSuccess({ recipe }))
                )
            )
        ));

    deleteRecipe = createEffect(
        () => this.actions$.pipe(
            ofType(RecipesActions.deleteRecipe),
            switchMap(action =>
                this.recipesService.deleteRecipe(action.id).pipe(
                    map(id => RecipesActions.deleteRecipeSuccess({ id }))
                )
            )
        ));
}
