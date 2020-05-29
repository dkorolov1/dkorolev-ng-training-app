import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthData } from '../shared/models/authData';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @ViewChild('authForm') authForm: NgForm;

  loading: boolean = false;
  logInMode: boolean = false;
  errorMessage: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onSwitchMode() {
    this.logInMode = !this.logInMode;
  }

  onSubmit() {
    if (!this.authForm.valid)
      return;
    this.loading = true;
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    const authObs: Observable<AuthData> = this.logInMode
      ? this.authService.logIn(email, password)
      : this.authService.signUp(email, password);
    authObs.subscribe(authData => {
      this.loading = false;
      this.router.navigate(['/recipes']);
    }, (errorMessage: string) => {
      this.loading = false;
      this.errorMessage = errorMessage;
    });
    this.authForm.reset();
  }

  onHandleError() {
    this.errorMessage = null;
  }
}
