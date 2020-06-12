import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import * as fromApp from '../store/app.reducer';
import * as fromAuth from './store/auth.selectors';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('authForm')
  authForm: NgForm;

  loading: boolean;
  logInMode: boolean;
  errorMessage: string;

  authErrorStoreSubscription: Subscription;
  authLoadingStoreSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.authLoadingStoreSubscription = this.store.select(fromAuth.getAuthLoading)
      .subscribe(loading => {
        this.loading = loading;
      });
    this.authErrorStoreSubscription = this.store.select(fromAuth.getAuthError)
      .subscribe(errorMessage => {
        this.errorMessage = errorMessage;
      });
  }

  onSwitchMode() {
    this.logInMode = !this.logInMode;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    const action = this.logInMode
      ? AuthActions.logIn({ email, password })
      : AuthActions.signUp({ email, password });
    this.store.dispatch(action);
    this.authForm.reset();
  }

  onHandleError() {
    this.store.dispatch(AuthActions.clearError());
  }

  ngOnDestroy(): void {
    this.authErrorStoreSubscription.unsubscribe();
    this.authLoadingStoreSubscription.unsubscribe();
  }
}
