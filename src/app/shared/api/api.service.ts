import { Injectable } from '@angular/core';
import { map, tap, take, exhaustMap } from 'rxjs/operators'
import { HttpClient, HttpParams } from '@angular/common/http';

import { Recipe } from '../models/recipe.model';
import { AuthService } from '../services/auth.service';
import { RecipeService } from '../services/recipe.service';

const RESIPES_ENDPOINT_URL = 'https://dkorolev-ng-cource-project.firebaseio.com/recipes.json';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private httpClient: HttpClient,
        private recipesService: RecipeService,
        private authService: AuthService) { };

    replaceRecipes() {
        const recipes = this.recipesService.getRecipes();
        this.httpClient.put(RESIPES_ENDPOINT_URL, recipes).subscribe();
    }

    fetchRecipes() {
        return this.httpClient.get<Recipe[]>(RESIPES_ENDPOINT_URL).pipe(
            map(recipes => {
                return recipes.map(recipe =>
                    recipe.ingredients ? recipe : { ...recipe, ingredients: [] });
            }),
            tap(recipes => {
                this.recipesService.setRecipes(recipes)
            })
        );
    }
}
