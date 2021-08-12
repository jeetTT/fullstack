import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { IAppState, selectAuthState } from '../../store/app.states';
import { ResetStore, SignUp } from '../../store/actions/auth.actions';
import { IState } from '../../store/reducers/auth.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './SignUp.component.html',
  styleUrls: ['./SignUp.component.css']
})
export class SignUpComponent implements OnInit {

  signUpFormGroup: FormGroup | any;
  signUpFormErrors: any;
  user: User = new User();
  state: Observable<any> | any;
  error: any;
  constructor(private formBuilder: FormBuilder, private store: Store<IAppState>) {
    this.state = this.store.select(selectAuthState);
    this.signUpFormErrors = {
      name: {},
      email: {},
      password: {}
    };
  }

  ngOnInit() {
    this.store.dispatch(new ResetStore());
    this.state.subscribe((s: IState) => {
      this.error = s.error
    })
    this.signUpFormGroup = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
    });

    this.signUpFormGroup.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }


  onSubmit(formData: FormGroup) {
    const payload = {
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password,
      isActive: true
    };
    this.store.dispatch(new SignUp(payload));
  }
  onLoginFormValuesChanged() {
    for (const field in this.signUpFormErrors) {
      if (!this.signUpFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.signUpFormErrors[field] = {};

      // Get the control
      const control = this.signUpFormGroup.get(field);

      if (control && control.dirty && !control.valid) {
        this.signUpFormErrors[field] = control.errors;
      }
    }
  }

}