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
  FriendsLoaded,
  FriendRequestLoaded,
  FriendRequestRequested,
  SendFriendRequestFinished,
  SendFriendRequestStarted
} from "./friend.actions";
// services
import { FriendService } from "../_services/friend.service";

@Injectable()
export class FriendEffects {
  constructor(private action$: Actions, private friendService: FriendService) {}

  // helpers
  handleErrors(error) {
    return new FriendError({ error });
  }

  // -- loading --

  // get all friends
  @Effect()
  friendsLoaded$: Observable<FriendsLoaded | FriendError> = this.action$.pipe(
    ofType<FriendsRequested>(FriendActionTypes.FriendsRequested),
    switchMap(action =>
      this.friendService.getFriends().pipe(
        map((res: HttpRes) => {
          if (res === null)
            return this.handleErrors("Could not fetch friends.");

          return new FriendsLoaded({ friends: res.payload.friends });
        }),
        catchError(err => of(null))
      )
    )
  );

  // get all friend requests
  @Effect()
  FriendRequestLoaded$: Observable<
    FriendRequestLoaded | FriendError
  > = this.action$.pipe(
    ofType<FriendRequestRequested>(FriendActionTypes.FriendRequestRequested),
    switchMap(action =>
      this.friendService.getAllFriendRequests().pipe(
        map((res: HttpRes) => {
          if (res === null)
            return this.handleErrors("Could not fetch friends requests.");

          const { payload } = res;
          const { friendRequests } = payload;

          return new FriendRequestLoaded({
            friendRequests
          });
        }),
        catchError(err => of(err))
      )
    )
  );

  // -- overlay --

  // send a friend request
  @Effect()
  SendFriendRequestFinished$: Observable<
    SendFriendRequestFinished | FriendError
  > = this.action$.pipe(
    ofType<SendFriendRequestStarted>(
      FriendActionTypes.SendFriendRequestStarted
    ),
    switchMap(action => {
      console.log("action", action);
      return this.friendService.sendFriendRequest(action.payload.friendId).pipe(
        map((res: HttpRes) => {
          if (!res) return this.handleErrors("Could not send friend request.");

          return new SendFriendRequestFinished({
            friendRequest: res.payload.friendRequest
          });
        }),
        catchError(err => of(null))
      );
    })
  );
}
