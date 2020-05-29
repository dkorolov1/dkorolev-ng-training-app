import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { OnInit, ViewChild, Component, OnDestroy } from '@angular/core';

import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false })
  form: NgForm;

  editMode: boolean;
  editedItem: Ingredient;
  editedItemIndex: number;
  editModeSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.editModeSubscription = this.shoppingListService.inEditMode
      .subscribe((index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService
          .getIngredient(index);

        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      });
  }

  onSubmit() {
    const iName = this.form.value.name;
    const iAmount = this.form.value.amount;
    const ingredient = new Ingredient(iName, iAmount);
    if (this.editMode) {
      this.shoppingListService
        .updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService
        .addIngredient(ingredient);
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.editedItem = null;
    this.editedItemIndex = null;
    this.form.reset();
  }

  onDelete() {
    this.shoppingListService
      .deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.editModeSubscription.unsubscribe();
  }
}
