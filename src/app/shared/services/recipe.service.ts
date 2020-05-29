import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Recipe } from 'src/app/shared/models/recipe.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({providedIn: 'root'})
export class RecipeService {
    private recipes: Recipe[] = [];

    recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

    constructor(private shoppingListService: ShoppingListService) { }

    emitChanges() {
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.emitChanges();
    } 

    addToShoppingList(recipe: Recipe) {
        this.shoppingListService
            .addIngredients(recipe.ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.emitChanges();
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.emitChanges();
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.emitChanges();
    }
}