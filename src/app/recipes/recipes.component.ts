import { Component, OnInit } from '@angular/core';

import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import * as RecipesActions from './store/recipes.actions';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    //this.store.dispatch(new RecipesActions.FetchRecipes());
  }
}
