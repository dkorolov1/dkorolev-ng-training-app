import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromApp from '../store/app.reducer';
import { User } from '../shared/models/user.model';
import * as fromAuth from '../auth/store/auth.selectors';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    user$: Observable<User>;
    collapsed = true;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit(): void {
        this.user$ = this.store
            .select(fromAuth.getAuthUser);
    }

    onWindowRecize() {
        this.collapsed = true;
    }

    onLogOut() {
        this.store
            .dispatch(new AuthActions.LogOut());
    }
}
