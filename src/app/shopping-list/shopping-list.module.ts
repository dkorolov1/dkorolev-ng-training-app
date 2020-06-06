import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule, OnInit } from '@angular/core';

import * as fromApp from '../store/app.reducer';
import { SharedModule } from '../shared/shared.module';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListRountingModule } from './shopping-list.routing.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import * as ShoppingListActions from './store/shopping-list.actions';

@NgModule({
    declarations: [
        ShoppingEditComponent,
        ShoppingListComponent
    ],
    imports: [
        // ng
        FormsModule,
        RouterModule,
        // shared
        SharedModule,
        // routing
        ShoppingListRountingModule
    ]
})
export class ShoppingListModule {

}