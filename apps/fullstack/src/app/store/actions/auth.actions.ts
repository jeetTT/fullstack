import { Action } from "@ngrx/store";
import { User } from "../../models/user";

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] SUCCESS',
  LOGIN_ERROR = "[Auth] LOGIN_ERROR",
  LOGOUT = "[Auth] Logout",
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  FORGOTPASSWORD = '[Auth] ForgotPassword',
  FORGOTPASSWORD_SUCCESS = '[Auth] ForgotPassword Success',
  FORGOTPASSWORD_FAILURE = '[Auth] ForgotPassword Failure',
  RESETPASSWORD = '[Auth] ResetPassword',
  RESETPASSWORD_SUCCESS = '[Auth] ResetPassword Success',
  RESETPASSWORD_FAILURE = '[Auth] ResetPassword Failure',
  GETUSER = '[Auth] GetUser',
  GETUSER_SUCCESS = '[Auth] GetUser Success',
  GETUSER_FAILURE = '[Auth] GetUser Failure',
  RESET_STORE = '[Auth] Reset Store'
}

export class Login implements Action {
  type = AuthActionTypes.LOGIN;
  constructor(public payload: any) { }

}
export class LoginSuccess implements Action {
  type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {

  }
}
export class LoginFailure implements Action {
  type = AuthActionTypes.LOGIN_ERROR;
  constructor(public payload: any) { }

}
export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: any) { }
}
export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) { }
}
export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public payload: any) { }
}
export class ForGotPassword implements Action {
  readonly type = AuthActionTypes.FORGOTPASSWORD;
  constructor(public payload: any) { }
}
export class ForgotPasswordSuccess implements Action {
  readonly type = AuthActionTypes.FORGOTPASSWORD_SUCCESS;
  constructor(public payload: any) { }
}
export class ForgotPasswordFailure implements Action {
  readonly type = AuthActionTypes.FORGOTPASSWORD_FAILURE;
  constructor(public payload: any) { }
}
export class ResetPassword implements Action {
  readonly type = AuthActionTypes.RESETPASSWORD;
  constructor(public payload: any) { }
}
export class ResetPasswordSuccess implements Action {
  readonly type = AuthActionTypes.RESETPASSWORD_SUCCESS;
  constructor(public payload: any) { }
}
export class ResetPasswordFailure implements Action {
  readonly type = AuthActionTypes.RESETPASSWORD_FAILURE;
  constructor(public payload: any) { }
}
export class GetUser implements Action {
  readonly type = AuthActionTypes.GETUSER;
  constructor(public payload: any) { }
}
export class GetUserSuccess implements Action {
  readonly type = AuthActionTypes.GETUSER_SUCCESS;
  constructor(public payload: any) { }
}
export class GetUserFailure implements Action {
  readonly type = AuthActionTypes.GETUSER_FAILURE;
  constructor(public payload: any) { }
}

export class Logout implements Action {
  type = AuthActionTypes.LOGOUT
}
export class ResetStore implements Action {
  type = AuthActionTypes.RESET_STORE
}

export type All =
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | ForGotPassword
  | ForgotPasswordSuccess
  | ForgotPasswordFailure
  | ResetPassword
  | ResetPasswordSuccess
  | ResetPasswordFailure
  | GetUser
  | GetUserSuccess
  | GetUserFailure