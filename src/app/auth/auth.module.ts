import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.mdule';
import { AuthRoutingModule } from './auth.routing.module';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        // ng
        FormsModule,
        // shared 
        SharedModule,
        // routing
        AuthRoutingModule
    ]
})
export class AuthModule {

}