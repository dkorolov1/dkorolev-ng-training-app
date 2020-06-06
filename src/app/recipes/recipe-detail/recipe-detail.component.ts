import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';

import * as fromApp from 'src/app/store/app.reducer';
import * as fromRecipes from '../store/recipes.selectors';
import { Recipe } from '../../shared/models/recipe.model';
import * as RecipesActions from '../../recipes/store/recipes.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
      private router: Router,
      private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select(fromRecipes.getSelectedRecipe)
      .subscribe(recipe => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.recipe.id));
    this.router.navigate(['recipes']);
  }
}
