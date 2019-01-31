import { Injectable } from "@angular/core";
import { switchMap, map, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { Actions, Effect, ofType } from "@ngrx/effects";
// models
import { HttpRes } from "../_models/http-res.model";
// actions
import {
  FriendError,
  FriendActionTypes,
  // loading
  FriendsRequested,
  FriendsLoaded
} from "./friend.actions";
// services
import { FriendService } from "../_services/friend.service";

@Injectable()
export class FriendEffects {
  constructor(private action$: Actions, private friendService: FriendService) {}

  // helpers
  handleErrors() {
    return new FriendError({ error: "Could not fetch the profile" });
  }

  // loading

  // get all friends
  @Effect()
  friendsLoaded$: Observable<FriendsLoaded | FriendError> = this.action$.pipe(
    ofType<FriendsRequested>(FriendActionTypes.FriendsRequested),
    switchMap(action =>
      this.friendService.getFriends().pipe(
        map((res: HttpRes) => {
          if (!res) return this.handleErrors();

          return new FriendsLoaded({ friends: res.payload.friends });
        }),
        catchError(err => of(null))
      )
    )
  );
}
