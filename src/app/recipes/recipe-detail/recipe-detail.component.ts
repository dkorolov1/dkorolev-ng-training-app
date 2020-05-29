import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipeId: number;

  constructor(private recipeService: RecipeService,
      private activeRoute: ActivatedRoute,
      private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.recipeId = +this.activeRoute.snapshot.params['id'];
      this.recipe = this.recipeService
        .getRecipe(this.recipeId);
    });
  }

  onAddToShoppingList() {
    this.recipeService.addToShoppingList(this.recipe);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(['recipes']);
  }
}
