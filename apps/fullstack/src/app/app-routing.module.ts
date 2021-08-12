import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPassword } from './components/ForgotPassword/ForgotPassword.component';
import { ResetPasswordComponent } from './components/ResetPassword/ResetPassword.component';
import { SignInComponent } from './components/SignIn/SignIn.component';
import { SignUpComponent } from './components/SignUp/SignUp.component';
import { User } from './components/User/User.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'user', component: User },
  { path: 'reset-password', component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
