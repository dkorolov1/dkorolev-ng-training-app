import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full'
    },
    {
        // recipes lazy
        path: 'recipes',
        loadChildren: () =>
            import('./recipes/recipes.module')
                .then(m => m.RecipesModule)
    },
    {
        // shopping-list lazy
        path: 'shopping-list',
        loadChildren: () =>
            import('./shopping-list/shopping-list.module')
                .then(m => m.ShoppingListModule)
    },
    {
        // auth lazy
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.module')
                .then(m => m.AuthModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes,
            {
                preloadingStrategy: PreloadAllModules
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRountingModule {

}
