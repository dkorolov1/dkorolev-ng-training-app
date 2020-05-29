import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../shared/api/api.service';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed: boolean = true;
    private userSub: Subscription;
    authenticated: boolean = false;

    constructor(private apiService: ApiService, private authService: AuthService) {}
 
    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            this.authenticated = !!user;
        });
    }

    onWindowRecize() {
        this.collapsed = true
    }

    onSaveData() {
        this.apiService.replaceRecipes();
    }

    onFetchData() {
        this.apiService.fetchRecipes().subscribe();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    onLogOut() {
        this.authService.logOut();
    }
}