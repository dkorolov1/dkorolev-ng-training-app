import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from '../models/recipe.model';
import { ApiService } from '../api/api.service';
import { RecipeService } from './recipe.service';

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private apiService: ApiService, private recipesService: RecipeService) {};
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipesService.getRecipes();
        if (recipes.length == 0) {
            return this.apiService.fetchRecipes();
        }
        return recipes;
    }
}