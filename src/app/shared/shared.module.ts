import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './components/alert/alert.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
    declarations: [
        AlertComponent,
        DropdownDirective,
        LoadingSpinnerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,        
        AlertComponent,
        DropdownDirective,
        LoadingSpinnerComponent
    ]
})
export class SharedModule {

}