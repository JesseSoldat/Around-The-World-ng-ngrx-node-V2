import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

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

        const user: User = this.userFromToken(payload.token);

        localStorage.setItem("token", payload.token);

        this.handleSuccess(msg);
      }),
      catchError(err => {
        return this.handleError(err.error);
      })
    );
  }
}
