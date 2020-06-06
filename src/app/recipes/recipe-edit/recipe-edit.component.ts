import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import * as fromApp from 'src/app/store/app.reducer';
import * as fromRecipes from '../store/recipes.selectors';
import * as RecipesActions from '../../recipes/store/recipes.actions';
import { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editedRecipeId: string;
  editMode: boolean = false;
  editedRecipeData: Recipe;

  recipeForm: FormGroup;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  get ingredientControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
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
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      recipeName = this.editedRecipeData.name;
      recipeDesc = this.editedRecipeData.description;
      recipeImagePath = this.editedRecipeData.imagePath;
      if (this.editedRecipeData.ingredients) {
        for (let ingredient of this.editedRecipeData.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required
            ])
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'ingredients': recipeIngredients,
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required)
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required])
    }));
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    const recipeData = {...this.recipeForm.value};
    if(this.editMode) {
      this.store.dispatch(
        new RecipesActions.UpdateRecipe({id: this.editedRecipeId, ...recipeData}));
    } else {
      this.store.dispatch(
        new RecipesActions.AddRecipe(recipeData));
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