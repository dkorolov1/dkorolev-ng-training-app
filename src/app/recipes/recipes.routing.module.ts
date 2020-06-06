import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard';
import { RecipesComponent } from './recipes.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const recipesRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: RecipesComponent,
        resolve: [RecipesResolverService],
        children: [
            {
                path: 'new',
                component: RecipeEditComponent},
            {
                path: ':recipeId', 
                component: RecipeDetailComponent
            },
            {
                path: ':recipeId/edit',
                component: RecipeEditComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule]
})
export class RecipesRountingModule {

}