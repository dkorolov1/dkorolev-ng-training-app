import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { logIn, signUp, clearError } from './store/auth.actions';
import { getAuthLoading, getAuthError } from './store/auth.selectors';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner.component';

describe('AuthComponent', () => {
  let store: MockStore;
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AuthComponent,
        AlertComponent,
        LoadingSpinnerComponent
      ],
      providers: [
        provideMockStore()
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(getAuthLoading, false);
    store.overrideSelector(getAuthError, null);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getByCss(selector: string) {
    return fixture.debugElement.query(By.css(selector));
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an alert on error', () => {
    expect(getByCss('#error-message')).toBeFalsy();
    component.errorMessage = '<error>';
    fixture.detectChanges();
    expect(getByCss('#error-message')).toBeTruthy();
  });

  it('should show a spinner and hide the form when loading', () => {
    expect(getByCss('#authForm')).toBeTruthy();
    expect(getByCss('#spinner')).toBeFalsy();
    component.loading = true;
    fixture.detectChanges();
    expect(getByCss('#authForm')).toBeFalsy();
    expect(getByCss('#spinner')).toBeTruthy();
  });

  it('should dispatch logIn action', () => {
    spyOn(store, 'dispatch');

    const email = 'test@mail.com';
    const password = '<password>';
    component.logInMode = true;

    spyOnProperty(component.authForm, 'valid', 'get').and.returnValue(true);
    spyOnProperty(component.authForm, 'value', 'get').and.returnValue({ email, password });

    const submitBtnElement = getByCss('button#submit').nativeElement;
    submitBtnElement.click();

    expect(store.dispatch).toHaveBeenCalledWith(logIn({ email, password }));
  });

  it('should dispatch signUp action', () => {
    spyOn(store, 'dispatch');

    const email = 'test@mail.com';
    const password = '<password>';
    component.logInMode = false;

    spyOnProperty(component.authForm, 'valid', 'get').and.returnValue(true);
    spyOnProperty(component.authForm, 'value', 'get').and.returnValue({ email, password });

    const submitBtnElement = getByCss('button#submit').nativeElement;
    submitBtnElement.click();

    expect(store.dispatch).toHaveBeenCalledWith(signUp({ email, password }));
  });

  it('should switch modes', () => {
    const loginModeInitial = true;
    component.logInMode = loginModeInitial;
    const switchBtnElement = getByCss('button#swith-mode').nativeElement;
    switchBtnElement.click();
    expect(component.logInMode).toBe(!loginModeInitial);
  });

  it('should change the text on the buttons depending on the current mode', () => {
    const submitBtnElement = getByCss('button#submit').nativeElement;
    const switchBtnElement = getByCss('button#swith-mode').nativeElement;

    component.logInMode = true;
    fixture.detectChanges();

    expect(submitBtnElement.innerText).toBe('Log In');
    expect(switchBtnElement.innerText).toBe('Switch to Sign Up');

    component.logInMode = false;
    fixture.detectChanges();

    expect(submitBtnElement.innerText).toBe('Sign Up');
    expect(switchBtnElement.innerText).toBe('Switch to Log in');
  });

  it('should dispatch a clearError action after closing the error', () => {
    spyOn(store, 'dispatch');
    component.onHandleError();
    expect(store.dispatch).toHaveBeenCalledWith(clearError());
  });
});
