import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { OnInit, ViewChild, Component, OnDestroy } from '@angular/core';

import * as fromApp from '../../store/app.reducer';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as ShoppingListSelectors from '../store/shopping-list.selectors';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form')
  form: NgForm;

  editMode: boolean;
  editedIngredient: Ingredient;
  editModeSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.editModeSubscription = this.store
      .select(ShoppingListSelectors.getEditedIngredient)
      .subscribe(ingredient => {
        if (ingredient.id) {
          this.editMode = true;
          this.editedIngredient = ingredient;
          this.form.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit() {
    const iName = this.form.value.name;
    const iAmount = this.form.value.amount;
    const ingredientData = new Ingredient(iName, iAmount);
    let action = null;
    if (this.editMode) {
      const ingredient = {
        ...ingredientData,
        id: this.editedIngredient.id,
      };
      action = ShoppingListActions.updateIngredient({ ingredient });
    } else {
      action = ShoppingListActions.addIngredients({
        ingredients: [ingredientData]
      });
    }
    this.store.dispatch(action);
    this.onClear();
  }

  onClear() {
    this.store.dispatch(ShoppingListActions.stopEditIngredient());
    this.clear();
  }

  onDelete() {
    this.store.dispatch(ShoppingListActions.deleteIngredient({
      id: this.editedIngredient.id
    }));
    this.clear();
  }

  private clear() {
    this.form.reset();
    this.editMode = false;
    this.editedIngredient = null;
  }

  ngOnDestroy(): void {
    this.editModeSubscription.unsubscribe();
    this.store.dispatch(ShoppingListActions.stopEditIngredient());
  }
}
