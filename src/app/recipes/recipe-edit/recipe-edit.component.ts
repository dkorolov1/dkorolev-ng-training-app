import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Recipe } from 'src/app/shared/models/recipe.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editedRedipeId: number;
  editMode: boolean = false;

  recipeForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  get ingredientControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        const editMode = params['id'] != null;
        if (editMode) {
          this.editedRedipeId = +params['id'];
        }
        this.editMode = editMode;
      });
    this.initForm();
  }

  initForm() {
    let recipeName = '';
    let recipeDesc = '';
    let recipeImageUrl = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.editedRedipeId);
      recipeName = recipe.name;
      recipeDesc = recipe.description;
      recipeImageUrl = recipe.imagePath;
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'ingredients': recipeIngredients,
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'imageUrl': new FormControl(recipeImageUrl, Validators.required)
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }));
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    const name: string = this.recipeForm.value.name;
    const description: string = this.recipeForm.value.description;
    const imagePath: string = this.recipeForm.value.imageUrl;
    const ingredients: Ingredient[] = this.recipeForm.value.ingredients;
    const recipe = new Recipe(name, description, imagePath, ingredients);
    if (this.editMode) {
      this.recipeService
        .updateRecipe(this.editedRedipeId, recipe);
    } else {
      this.recipeService
        .addRecipe(recipe);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute })
  }
}