import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromApp from 'src/app/store/app.reducer';
import { Recipe } from '../../shared/models/recipe.model';
import * as fromRecipes from '../store/recipes.selectors';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.recipes$ = this.store
      .select(fromRecipes.getAllRecipes);
  }
}
