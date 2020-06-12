import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../auth/auth-guard.service';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListResolverService } from './shopping-list.resolver.service';

const shoppingListRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuardService],
        component: ShoppingListComponent,
        resolve: [ShoppingListResolverService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(shoppingListRoutes)],
    exports: [RouterModule]
})
export class ShoppingListRountingModule {

}
