import { User } from "../../models/user";
import { AuthActionTypes } from "../actions/auth.actions";

export interface IState {
  isAuthenticated: boolean;
  user: User | null;
  error: any;
  success: string;
  userList: any;
}

export const initialState: IState = {
  isAuthenticated: false,
  user: null,
  error: null,
  success: '',
  userList: []
};

export function reducer(state = initialState, action: any): IState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          email: action.payload.email,
          password: action.payload.password
        },
        error: null,
        success: "Logged in successfully"
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email
        },
        error: null,
        success: "Registration successfully"
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        error: 'This email is already in use.',
        success: ''
      };
    }

    case AuthActionTypes.LOGIN_ERROR: {
      return {
        ...state,
        error: 'Invalid User/Password',
        success: ''
      };
    }
    case AuthActionTypes.FORGOTPASSWORD_SUCCESS: {
      return {
        ...state,
        //isAuthenticated: true,
        user: {
          email: action.payload.email
        },
        error: null
      };
    }
    case AuthActionTypes.FORGOTPASSWORD_FAILURE: {
      return {
        ...state,
        error: 'Email does not exist.'
      };
    }

    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    case AuthActionTypes.GETUSER_SUCCESS: {
      return {
        ...state,
        userList: action.payload.UserData,
        error: null,
        success: "",
      };
    }
    case AuthActionTypes.GETUSER_FAILURE: {
      return {
        ...state,
        error: 'Something went wrong.',
        success: ''
      };
    }
    case AuthActionTypes.RESET_STORE: {
      return {
        ...state,
        error: '',
        success: ''
      };
    }

    default: {
      return state;
    }
  }
}


