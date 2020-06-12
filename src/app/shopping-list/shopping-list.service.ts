import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Ingredient } from '../shared/models/ingredient.model';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {
    constructor(private httpClient: HttpClient) { }

    fetchIngredients = (userId: string) =>
        this.httpClient.get(`${environment.fireBaseDbUrl}/sList/${userId}.json`).pipe(
            map(ingredients => ingredients ? ingredients : {}),
            map(ingredients => Object.keys(ingredients).reduce((acc, key) => {
                acc[key] = { ...ingredients[key], id: key };
                return acc;
            }, {}))
        )

    addIngredient = (userdId: string, ingredient: Ingredient) =>
        this.httpClient.post<{ name: string }>(`${environment.fireBaseDbUrl}/sList/${userdId}.json`, { ...ingredient }).pipe(
            map(({ name }) =>
                ({ [name]: { ...ingredient, id: name } })
            )
        )

    addIngredients = (userdId: string, ingredients: Ingredient[]) =>
        forkJoin(ingredients.map(i => this.addIngredient(userdId, i))).pipe(
            map(items => items.reduce((acc, i) => ({ ...acc, ...i }), {}))
        )

    updateIngredient = (userdId: string, ingredient: Ingredient) => {
        const { id, ...ingredientData } = ingredient;
        const url = `${environment.fireBaseDbUrl}/sList/${userdId}/${id}.json`;
        return this.httpClient.put<Ingredient>(url, { ...ingredientData }).pipe(
            map(ingrData => ({ ...ingrData, id: ingredient.id }))
        );
    }

    deleteIngredient = (userdId: string, ingredientId: string) => this.httpClient.delete<null>(
        `${environment.fireBaseDbUrl}/sList/${userdId}/${ingredientId}.json`
    )
}
