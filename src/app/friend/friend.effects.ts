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
  // small spinner
  SendFriendRequestFinished,
  SendFriendRequestStarted,
  AcceptFriendRequestFinished,
  AcceptFriendRequestStarted
} from "./friend.actions";
// services
import { FriendService } from "../_services/friend.service";

@Injectable()
export class FriendEffects {
  constructor(private action$: Actions, private friendService: FriendService) {}

  // helpers
  handleErrors(errType: string) {
    const messages = {
      fetch: "There was an error fetching the friend requests",
      send: "There was an error sending the friend request",
      accept: "There was an error accepting the friend request"
    };

    return new FriendError({ error: messages[errType] });
  }

  // -- loading --

  // get all friends
  @Effect()
  friendsLoaded$: Observable<FriendsLoaded | FriendError> = this.action$.pipe(
    ofType<FriendsRequested>(FriendActionTypes.FriendsRequested),
    switchMap(action =>
      this.friendService.getFriends().pipe(
        map((res: HttpRes) => {
          if (res === null) return this.handleErrors("fetch");

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
          if (res === null) return this.handleErrors("fetch");

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

  // -- small spinner --

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
          if (!res) return this.handleErrors("send");

          return new SendFriendRequestFinished({
            friendRequest: res.payload.friendRequest
          });
        }),
        catchError(err => of(null))
      );
    })
  );

  // accept a friend request
  @Effect()
  AcceptFriendRequestFinished$: Observable<
    AcceptFriendRequestFinished | FriendError
  > = this.action$.pipe(
    ofType<AcceptFriendRequestStarted>(
      FriendActionTypes.AcceptFriendRequestStarted
    ),
    switchMap(action =>
      this.friendService.acceptFriendRequest(action.payload.friendId).pipe(
        map((res: HttpRes) => {
          if (!res) return this.handleErrors("accept");

          const { friendRequestId, friends } = res.payload;

          return new AcceptFriendRequestFinished({
            friendRequestId,
            friends
          });
        }),
        catchError(err => of(null))
      )
    )
  );
}
