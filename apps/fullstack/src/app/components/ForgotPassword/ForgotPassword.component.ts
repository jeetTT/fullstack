import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { IAppState, selectAuthState } from '../../store/app.states';
import { ForGotPassword, ResetStore } from '../../store/actions/auth.actions';
import { IState } from '../../store/reducers/auth.reducer';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './ForgotPassword.component.html',
  styleUrls: ['./ForgotPassword.component.css']
})
export class ForgotPassword implements OnInit {
  user: User = new User();
  formGroup: FormGroup | any;
  forgotPasswordFormErrors: any;
  state: Observable<any> | any;
  error: any;
  constructor(private formBuilder: FormBuilder, private store: Store<IAppState>) {
    this.state = this.store.select(selectAuthState);
    this.forgotPasswordFormErrors = {
      email: {},
    };
  }

  ngOnInit() {
    this.store.dispatch(new ResetStore());
    this.state.subscribe((s: IState) => {
      this.error = s.error
    })
    this.formGroup = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
    });

    this.formGroup.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }


  onSubmit(formData: FormGroup) {
    const payload = {
      email: formData.value.email,
    };
    this.store.dispatch(new ForGotPassword(payload));
  }
  onLoginFormValuesChanged() {
    for (const field in this.forgotPasswordFormErrors) {
      if (!this.forgotPasswordFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.forgotPasswordFormErrors[field] = {};

      // Get the control
      const control = this.formGroup.get(field);

      if (control && control.dirty && !control.valid) {
        this.forgotPasswordFormErrors[field] = control.errors;
      }
    }
  }

}
