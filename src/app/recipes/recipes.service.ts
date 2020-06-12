import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '../shared/models/recipe.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RecipesService {
    constructor(private httpClient: HttpClient) { }

    getRecipes = () =>
        this.httpClient.get<{ [key: string]: Recipe; }>(`${environment.fireBaseDbUrl}/recipes.json`).pipe(
            map(recipes => !recipes ? {} : recipes),
            map(recipes => {
                return Object.keys(recipes).reduce((acc, key) => {
                    acc[key] = { ...recipes[key], id: key };
                    return acc;
                }, {});
            })
        )

    deleteRecipe = (recipeId: string) =>
        this.httpClient.delete<null>(`${environment.fireBaseDbUrl}/recipes/${recipeId}.json`).pipe(
            map(() => recipeId)
        )

    updateRecipe(recipe: Recipe) {
        const { id, ...recipeData } = recipe;
        const url = `${environment.fireBaseDbUrl}/recipes/${id}.json`;
        return this.httpClient.put<Recipe>(url, { ...recipeData }).pipe(
            map(r => ({ id, ...r }))
        );
    }

    addRecipe = (recipe: Recipe) =>
        this.httpClient.post<{ name: string }>(`${environment.fireBaseDbUrl}/recipes.json`, { ...recipe }).pipe(
            map(({ name }) => {
                return { id: name, ...recipe };
            })
        )
}
