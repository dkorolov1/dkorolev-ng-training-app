import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Ingredient } from '../models/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient("Tomato", 5),
        new Ingredient("Potato", 15),
    ];

    inEditMode: Subject<number> = new Subject<number>();
    ingredientsChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();

    getIngredients() {
        return this.ingredients.slice();
    }

    private emitChanges() {
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.emitChanges();
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.emitChanges();
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.emitChanges();
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.emitChanges();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }
}