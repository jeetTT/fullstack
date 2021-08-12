import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { IAppState, selectAuthState } from '../../store/app.states';
import { ResetPassword, ResetStore } from '../../store/actions/auth.actions';
import { IState } from '../../store/reducers/auth.reducer';

@Component({
  selector: 'app-reset-password',
  templateUrl: './ResetPassword.component.html',
  styleUrls: ['./ResetPassword.component.css']
})
export class ResetPasswordComponent implements OnInit {
  user: User = new User();
  formGroup: FormGroup | any;
  resetPasswordFormErrors: any;
  state: Observable<any> | any;
  error: any;
  constructor(private formBuilder: FormBuilder, private store: Store<IAppState>) {
    this.state = this.store.select(selectAuthState);
    this.resetPasswordFormErrors = {
      password: {},
      confirmpassword: {},
    };
  }

  ngOnInit(): void {
    this.store.dispatch(new ResetStore());
    this.state.subscribe((s: IState) => {
      this.error = s.error
    })
    this.formGroup = this.formBuilder.group({
      'password': ['', Validators.required],
      'confirmpassword': ['', [Validators.required, confirmPassword]],
    });

    this.formGroup.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }
  onSubmit(formData: FormGroup) {
    const payload = {
      password: formData.value.password,
      // confirmpassword: formData.value.confirmpassword,
      email: localStorage.getItem('email')
    };
    this.store.dispatch(new ResetPassword(payload));
  }
  onLoginFormValuesChanged() {
    for (const field in this.resetPasswordFormErrors) {
      if (!this.resetPasswordFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.resetPasswordFormErrors[field] = {};

      // Get the control
      const control = this.formGroup.get(field);

      if (control && control.dirty && !control.valid) {
        this.resetPasswordFormErrors[field] = control.errors;
      }
    }
  }

}
function confirmPassword(control: AbstractControl) {
  if (!control.parent || !control) {
    return
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('confirmpassword');

  if (!password || !passwordConfirm) {
    return
  }

  if (passwordConfirm.value === '') {
    return
  }

  if (password.value !== passwordConfirm.value) {
    return {
      passwordsNotMatch: true
    };
  }
  return
}