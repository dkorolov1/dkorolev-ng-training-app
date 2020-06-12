import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import * as fromApp from 'src/app/store/app.reducer';
import * as fromRecipes from '../store/recipes.selectors';
import { Recipe } from 'src/app/shared/models/recipe.model';
import * as RecipesActions from '../../recipes/store/recipes.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  editedRecipeId: string;
  editedRecipeData: Recipe;

  recipeForm: FormGroup;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  ngOnInit(): void {
    this.store.select(fromRecipes.getSelectedRecipe)
      .subscribe(recipe => {
        this.editMode = !!recipe;
        if (this.editMode) {
          const {id, ...recipeData} = recipe;
          this.editedRecipeId = id;
          this.editedRecipeData = recipeData;
        }
      });
    this.initForm();
  }

  initForm() {
    let recipeName = '';
    let recipeDesc = '';
    let recipeImagePath = '';
    const recipeIngredients = new FormArray([]);
    if (this.editMode) {
      recipeName = this.editedRecipeData.name;
      recipeDesc = this.editedRecipeData.description;
      recipeImagePath = this.editedRecipeData.imagePath;
      if (this.editedRecipeData.ingredients) {
        for (const ingredient of this.editedRecipeData.ingredients) {
          recipeIngredients.push(new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [
              Validators.required
            ])
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      ingredients: recipeIngredients,
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDesc, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required)
    });
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required])
    }));
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onSubmit() {
    const recipeData = {...this.recipeForm.value};
    if (this.editMode) {
      this.store.dispatch(
        RecipesActions.updateRecipe({ id: this.editedRecipeId, ...recipeData }));
    } else {
      this.store.dispatch(
        RecipesActions.addRecipe(recipeData));
    }
    this.goBack();
  }

  onCancel() {
    this.goBack();
  }

  goBack() {
    this.router.navigate(['../']);
  }
}
