import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.mdule';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListRountingModule } from './shopping-list.routing.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

@NgModule({
    declarations: [
        ShoppingEditComponent,
        ShoppingListComponent,
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