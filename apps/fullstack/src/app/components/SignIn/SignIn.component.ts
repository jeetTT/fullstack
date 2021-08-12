import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';  
import { User } from '../../models/user';
import { IAppState, selectAuthState } from '../../store/app.states';
import { Login, ResetStore } from '../../store/actions/auth.actions';
import { IState } from '../../store/reducers/auth.reducer';


@Component({
  selector: 'app-signin',
  templateUrl: './SignIn.component.html',
  styleUrls: ['./SignIn.component.css']
})
export class SignInComponent implements OnInit {
  user: User = new User();
  formGroup: FormGroup | any;
  loginFormErrors: any;
  state: Observable<any> | any;
  error: any;
  constructor(private formBuilder: FormBuilder,private store: Store<IAppState>) {
    this.state = this.store.select(selectAuthState);
    this.loginFormErrors = {
      email: {},
      password: {}
    };
  }

  ngOnInit() {
    this.store.dispatch(new ResetStore());
    this.state.subscribe((s: IState) => {
      this.error = s.error
    })
    this.formGroup = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
    });

    this.formGroup.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }


  onSubmit(formData: FormGroup) {
    const payload = {
      email: formData.value.email,
      password: formData.value.password,
    };
     this.store.dispatch(new Login(payload));  
  }
  onLoginFormValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.formGroup.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }

}
