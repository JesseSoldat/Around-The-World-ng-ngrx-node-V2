import { Injectable } from "@angular/core";
import { tap, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "../_reducers";
// selectors
import { selectUserId } from "../auth/auth.selectors";
// models
import { HttpRes } from "../_models/http-res.model";
import { Profile } from "../_models/profile.model";
// services
import { HttpService } from "./http.service";

@Injectable()
export class ProfileService {
  userId: string;

  constructor(
    private store: Store<AppState>,
    private httpService: HttpService
  ) {
    this.getUserId();
  }

  // helpers
  errorLogger(err) {
    console.error("Friend Service:", err.error);
    return of(null);
  }

  // store / api calls;

  getUserId() {
    this.store
      .pipe(
        select(selectUserId),
        tap((userId: string) => (this.userId = userId))
      )
      .subscribe();
  }

  // get profile
  getProfile(): Observable<HttpRes | null> {
    if (!this.userId) return of(null);

    return this.httpService
      .httpGetRequest(`profile/${this.userId}`)
      .pipe(catchError(err => this.errorLogger(err)));
  }
}
