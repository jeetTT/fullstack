import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import { AuthActionTypes, Login, LoginSuccess, LoginFailure, SignUp, SignUpSuccess, SignUpFailure, ForGotPassword, ForgotPasswordSuccess, ForgotPasswordFailure, ResetPassword, ResetPasswordSuccess, ResetPasswordFailure, GetUserSuccess, GetUser, GetUserFailure } from "../actions/auth.actions";

@Injectable()
export class AuthEffects {

  @Effect()
  LoginIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: Login) => action.payload),
    switchMap(payload => {
      return this.authService.loginIn(payload).pipe(
        map((user: any) => {
          return new LoginSuccess({ token: user.access_token, email: user.user.email, name: user.user.name });
        }),
        catchError((error) => {
          return of(new LoginFailure({ error }));
        })
      )
    })
  )
  @Effect({ dispatch: false })
  LoginSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user: any) => {
      localStorage.setItem('token', user.payload.token);
      localStorage.setItem('email', user.payload.email);
      localStorage.setItem('name', user.payload.name);
      this.router.navigate(['/user']);
    })
  )

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_ERROR)
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      return this.authService.signUp(payload).pipe(
        map((user: any) => {
          return new SignUpSuccess({});
        }),
        catchError((error) => {
          return of(new SignUpFailure({ error }));
        })
      )
    })
  )

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user: any) => {
      this.router.navigateByUrl('/signin');
    })
  );


  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );
  @Effect()
  ForgotPassword: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.FORGOTPASSWORD),
    map((action: ForGotPassword) => action.payload),
    switchMap(payload => {
      return this.authService.forgotPassword(payload).pipe(
        map((user: any) => {
          return new ForgotPasswordSuccess({ email: payload.email });
        }),
        catchError((error) => {
          return of(new ForgotPasswordFailure({ error }));
        })
      )
    })
  )

  @Effect({ dispatch: false })
  ForgotPasswordSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.FORGOTPASSWORD_SUCCESS),
    tap((user: any) => {
      localStorage.setItem('email', user.payload.email);
      this.router.navigateByUrl('/reset-password');
    })
  );


  @Effect({ dispatch: false })
  ForgotPasswordFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.FORGOTPASSWORD_FAILURE)
  );

  @Effect({ dispatch: false })
  LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      localStorage.clear();
      this.router.navigate(['/signin']);
    })
  )

  @Effect()
  ResetPassword: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.RESETPASSWORD),
    map((action: ResetPassword) => action.payload),
    switchMap(payload => {
      return this.authService.resetPassword(payload).pipe(
        map((user: any) => {
          return new ResetPasswordSuccess({});
        }),
        catchError((error) => {
          return of(new ResetPasswordFailure({ error }));
        })
      )
    })
  )

  @Effect({ dispatch: false })
  ResetPasswordSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.RESETPASSWORD_SUCCESS),
    tap((user: any) => {
      this.router.navigateByUrl('/signin');
    })
  );

  @Effect({ dispatch: false })
  ResetPasswordFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.RESETPASSWORD_FAILURE)
  );

  // @Effect()
  // GetUser: Observable<any> = this.actions.pipe(
  //   ofType(AuthActionTypes.GETUSER),
  //   map((action: GetUser) => action.payload),
  //   switchMap(payload => {
  //     return this.authService.getUser(payload).pipe(
  //       map((user: any) => {
  //         return new GetUserSuccess({ user: user });
  //       }),
  //       catchError((error) => {
  //         return of(new GetUserFailure({ error }));
  //       })
  //     )
  //   })
  // )
  GetUser = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthActionTypes.GETUSER),
      map((action: GetUser) => action.payload),
      switchMap(payload => {
        return this.authService.getUser(payload).pipe(
          map((user: any) => {
            return new GetUserSuccess({ UserData: user });
          }),
          catchError((error) => {
            return of(new GetUserFailure({ error }));
          })
        )
      })
    )
  });

  @Effect({ dispatch: false })
  GetUserSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GETUSER_SUCCESS),
    tap((user: any) => {
      return new GetUserSuccess({ UserData: user });
    })
  );

  @Effect({ dispatch: false })
  GetUserFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GETUSER_FAILURE),
    tap((user: any) => {
      this.router.navigateByUrl('/signin');
    })
  );



  @Effect({ dispatch: false })
  ResetStore: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.RESET_STORE),
    tap(() => { })
  )

  // @Effect()
  // LogOut: Observable<any> = this.actions.pipe(
  //   ofType(AuthActionTypes.LOGOUT),
  //   map((action: SignUp) => action.payload),
  //   switchMap(payload => {
  //     return this.authService.signUp(payload).pipe(
  //       map((user: any) => {
  //         return new LoginSuccess({ token: user.token, email: payload.email });
  //       }),
  //       catchError((error) => {
  //         return of(new LoginFailure({ error }));
  //       })
  //     )
  //   })
  // )


  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {

  }
}