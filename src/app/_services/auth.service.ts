import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { Store } from "@ngrx/store";
import { AppState } from "../_reducers";
import { Register, Login } from "../auth/auth.actions";
// models
import { Auth } from "../_models/auth.model";
import { User } from "../_models/user.model";
import { HttpRes } from "../_models/http-res.model";
// services
import { HttpService } from "./http.service";
// utils
import { decodeToken } from "../_utils/decodeToken";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  toastrOptions = {
    timeOut: 3000,
    positionClass: "toast-bottom-right"
  };

  constructor(
    private store: Store<AppState>,
    private httpService: HttpService,
    private toastr: ToastrService
  ) {}

  // helpers
  handleError({ msg }) {
    console.log("handleError", msg);

    this.toastr.error("", msg, this.toastrOptions);
    return of({ msg, payload: null });
  }

  handleSuccess(msg): void {
    this.toastr.success("", msg, this.toastrOptions);
  }

  userFromToken(token: string): User {
    const decodedToken = decodeToken(token);

    return { ...decodedToken };
  }

  // api calls
  registerByEmail(auth: Auth): Observable<HttpRes> {
    return this.httpService.httpPostRequest("register", auth).pipe(
      tap((res: HttpRes) => {
        const { msg, payload } = res;
        const { token } = payload;

        const user: User = this.userFromToken(token);

        this.handleSuccess(msg);

        this.store.dispatch(new Register({ user, token }));
      }),
      catchError(err => {
        return this.handleError(err.error);
      })
    );
  }

  loginByEmail(auth: Auth): Observable<HttpRes> {
    return this.httpService.httpPostRequest("login", auth).pipe(
      tap((res: HttpRes) => {
        const { msg, payload } = res;
        const { token } = payload;

        const user: User = this.userFromToken(token);

        this.handleSuccess(msg);

        this.store.dispatch(new Login({ user, token }));
      }),
      catchError(err => this.handleError(err.error))
    );
  }
}
