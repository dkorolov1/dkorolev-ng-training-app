import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as RecipesActions from './recipes.actions';
import { environment } from 'src/environments/environment';
import { Recipe } from 'src/app/shared/models/recipe.model';

@Injectable()
export class RecipesEffects {
    constructor(
        private actions$: Actions,
        private httpClient: HttpClient) { };

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            const url: string = `${environment.fireBaseDbUrl}/recipes.json`;
            return this.httpClient.get<{ [key: string]: Recipe; }>(url).pipe(
                map(recipes => !recipes ? {} : recipes),
                map(recipes => Object.keys(recipes).reduce((acc, key) => {
                    acc[key] = { ...recipes[key], id: key };
                    return acc;
                }, {})),
                map(recipes => new RecipesActions.FetchRecipesSuccess(recipes))
            )
        })
    );

    @Effect()
    addRecipe = this.actions$.pipe(
        ofType(RecipesActions.ADD_RECIPE),
        switchMap((addRecipeAction: RecipesActions.AddRecipe) => {
            const url = `${environment.fireBaseDbUrl}/recipes.json`;
            return this.httpClient.post<{ name: string }>(url, { ...addRecipeAction.payload }).pipe(
                map(({ name }) => {
                    return { id: name, ...addRecipeAction.payload }
                }),
                map(recipe =>
                    new RecipesActions.AddRecipeSuccess(recipe)
                )
            );
        })
    )

    @Effect()
    updateRecipe = this.actions$.pipe(
        ofType(RecipesActions.UPDATE_RECIPE),
        switchMap((action: RecipesActions.UpdateRecipe) => {
            debugger;
            const { id, ...recipeData } = action.payload;
            const url: string = `${environment.fireBaseDbUrl}/recipes/${id}.json`;
            return this.httpClient.put<Recipe>(url, { ...recipeData }).pipe(
                map((recipeData: Recipe) => {
                    return { id, ...recipeData }
                }),
                map((recipe: Recipe) =>
                    new RecipesActions.UpdateRecipeSuccess(recipe)
                )
            );
        })
    )

    @Effect()
    deleteRecipe = this.actions$.pipe(
        ofType(RecipesActions.DELETE_RECIPE),
        switchMap((action: RecipesActions.DeleteRecipe) => {
            const recipeId = action.payload;
            const url: string = `${environment.fireBaseDbUrl}/recipes/${recipeId}.json`;
            return this.httpClient.delete<null>(url).pipe(
                map(() => new RecipesActions.DeleteRecipeSuccess(recipeId))
            );
        })
    )
}