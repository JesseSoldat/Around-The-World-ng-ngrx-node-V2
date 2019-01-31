import { AuthActions, AuthActionTypes } from "./auth.actions";
import { User } from "../_models/user.model";

export interface AuthState {
  isAuth: boolean;
  user: User;
}

export const initialAuthState: AuthState = {
  isAuth: false,
  user: undefined
};

export function authReducer(state = initialAuthState, action: AuthActions) {
  const { payload } = action;
  switch (action.type) {
    case AuthActionTypes.RegisterAction:
      return {
        isAuth: true,
        user: payload.user
      };

    case AuthActionTypes.LoginAction:
      return {
        isAuth: true,
        user: payload.user
      };

    case AuthActionTypes.LogoutAction:
      return {
        isAuth: false,
        user: null
      };

    default:
      return { ...state };
  }
}
