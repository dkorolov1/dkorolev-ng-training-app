import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import * as fromApp from '../store/app.reducer';
import { Ingredient } from '../shared/models/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as ShoppingListSelectors from './store/shopping-list.selectors';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('ingredient', [
      // final state
      state('in', style({
        opacity: 1,
        transform: 'translateX(0px)' 
      })),
      // from not existing state to any state (adding items)
      transition('void => *', [
        // initial style
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      // from any state to not existing state (deleting items)
      transition('* => void', [
        animate(300, style({
          // final styles
          opacity: 0,
          transform: 'translateX(100px)'
        }))
      ])
    ])
  ] 
})
export class ShoppingListComponent implements OnInit {
  ingredients$: Observable<Ingredient[]>;

  constructor(private store: Store<fromApp.AppState>) { }
  
  ngOnInit(): void {
    this.ingredients$ = this.store
      .select(ShoppingListSelectors.getAllIngredients);
  }

  onEditItem(id: string) {
    debugger;
    this.store.dispatch(new ShoppingListActions.StartEditIngredient(id))
  }
}