import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as fromAuth from './store/auth.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @ViewChild('authForm')
  authForm: NgForm;

  logInMode: boolean;
  loading$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(fromAuth.getAuthLoading);
    this.errorMessage$ = this.store.select(fromAuth.getAuthError);
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
      ? new AuthActions.LogInStart({email, password})
      : new AuthActions.SignUpStart({email, password});
    this.store.dispatch(action);
    this.authForm.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }
}
