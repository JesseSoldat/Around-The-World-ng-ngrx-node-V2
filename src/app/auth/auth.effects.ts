import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { of, defer } from "rxjs";
// ngrx
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Register, Login, AuthActionTypes } from "./auth.actions";
// models
import { User } from "../_models/user.model";
// utils
import { checkTokenExpiration } from "../_utils/checkTokenExpiration";

const localSaveErr = "Could not save the user or token to local storage.";
const localGetErr = "Could not get the user or token from local storage.";
const localDeleteErr = "Could not remove the user or token from local storage.";

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions, private router: Router) {}

  // helpers
  notAuthNav(): void {
    this.router.navigateByUrl("/login");
  }

  isAuthNav(): void {
    console.log("path", window.location.pathname);

    switch (window.location.pathname) {
      case "/login":
      case "/register":
      case "/welcome":
      case "/":
        this.router.navigateByUrl("/dashboard");
        break;

      default:
        break;
    }
  }

  setToLocalStorage(payload): void {
    try {
      const { user, token } = payload;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      this.isAuthNav();
    } catch (err) {
      console.error(localSaveErr);
      this.isAuthNav();
    }
  }

  getFromLocalStorage() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      return { user, token };
    } catch {
      console.log(localGetErr);
      return { user: null, token: null };
    }
  }

  // effects
  @Effect({ dispatch: false })
  register$ = this.action$.pipe(
    ofType<Register>(AuthActionTypes.RegisterAction),
    tap(action => this.setToLocalStorage(action.payload))
  );

  @Effect({ dispatch: false })
  login$ = this.action$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => {
      console.log("login$");
      this.setToLocalStorage(action.payload);
    })
  );

  @Effect()
  init$ = defer(() => {
    try {
      const { user, token } = this.getFromLocalStorage();
      const isTokenExpired = checkTokenExpiration(token);

      // token is expired
      if (isTokenExpired || !user) {
        console.log("logout");
      } else {
        return of(new Login({ user, token }));
      }
    } catch (err) {}
  });
}
