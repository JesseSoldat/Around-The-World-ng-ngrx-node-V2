import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { tap, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "../_reducers";
// selectors
import { selectUserId } from "../auth/auth.selectors";
// models
import { HttpRes } from "../_models/http-res.model";
// services
import { HttpService } from "./http.service";
// actions
import { FriendError } from "../friend/friend.actions";

@Injectable()
export class FriendService {
  userId: string;
  toastrOptions = {
    timeOut: 3000,
    positionClass: "toast-bottom-right"
  };

  constructor(
    private httpService: HttpService,
    private store: Store<AppState>,
    private toastr: ToastrService
  ) {
    this.getUserId();
  }

  // helpers

  getUserId() {
    this.store
      .pipe(
        select(selectUserId),
        tap((userId: string) => (this.userId = userId))
      )
      .subscribe();
  }

  handleError(error) {
    console.error("friend service handleError:", error.err);
    this.toastr.error("", error.msg, this.toastrOptions);
    return of(null);
  }

  handleSuccess(msg) {
    this.toastr.success("", msg, this.toastrOptions);
  }

  // api calls
  getFriends(): Observable<HttpRes | null> {
    if (!this.userId) return of(null);

    return this.httpService
      .httpGetRequest(`friends/${this.userId}`)
      .pipe(
        catchError(err =>
          this.handleError({ err: err, msg: "Could not fetch friends" })
        )
      );
  }

  getAllFriendRequests(): Observable<HttpRes | null> {
    if (!this.userId) return of(null);

    return this.httpService
      .httpGetRequest(`friend/requests/${this.userId}`)
      .pipe(
        catchError(err =>
          this.handleError({ err: err, msg: "Could not fetch friend requests" })
        )
      );
  }

  sendFriendRequest(friendId: string): Observable<HttpRes | null> {
    if (!this.userId) return of(null);

    return this.httpService
      .httpPostRequest(`friend/request/${this.userId}`, { friendId })
      .pipe(
        tap((res: HttpRes) => this.handleSuccess(res.msg)),
        catchError(err =>
          this.handleError({ err: err, msg: "Could not send friend requests" })
        )
      );
  }
}
