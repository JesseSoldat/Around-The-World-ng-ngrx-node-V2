import { Action } from "@ngrx/store";
import { User } from "../_models/user.model";

export enum AuthActionTypes {
  LoginAction = "[Login Page] LoginAction",
  RegisterAction = "[Register Page] RegisterAction"
}

export class Register implements Action {
  readonly type = AuthActionTypes.RegisterAction;

  constructor(public payload: { user: User; token }) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;

  constructor(public payload: { user: User; token }) {}
}

export type AuthActions = Register | Login;