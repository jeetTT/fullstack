import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SignInComponent } from './components/SignIn/SignIn.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthEffects } from './store/effects/auth.effects';
import { AuthService } from './services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SignUpComponent } from './components/SignUp/SignUp.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.states';
import { ForgotPassword } from './components/ForgotPassword/ForgotPassword.component';
import { User } from './components/User/User.component';
import {MatTableModule} from '@angular/material/table';
import { ResetPasswordComponent } from './components/ResetPassword/ResetPassword.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPassword,
    User,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),

  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
