import { Action } from "@ngrx/store";
// models
import { Profile } from "../_models/profile.model";
import { FriendRequest } from "../_models/friend-request.model";

export enum FriendActionTypes {
  FriendError = "FriendError",
  // loading
  FriendsRequested = "FriendsRequested",
  FriendsLoaded = "FriendsLoaded",
  FriendRequestRequested = "FriendRequestRequested",
  FriendRequestLoaded = "FriendRequestLoaded"
}

// handle all profile errors
export class FriendError implements Action {
  readonly type = FriendActionTypes.FriendError;

  constructor(public payload: { error: string }) {}
}

// -- loading --

// get friends
export class FriendsRequested implements Action {
  readonly type = FriendActionTypes.FriendsRequested;
}

export class FriendsLoaded implements Action {
  readonly type = FriendActionTypes.FriendsLoaded;

  constructor(public payload: { friends: Profile[] }) {}
}

// get friend request
export class FriendRequestRequested implements Action {
  readonly type = FriendActionTypes.FriendRequestRequested;
}

export class FriendRequestLoaded implements Action {
  readonly type = FriendActionTypes.FriendRequestLoaded;

  constructor(public payload: { friendRequests: FriendRequest[] }) {}
}

export type FriendActions =
  | FriendError
  | FriendsRequested
  | FriendsLoaded
  | FriendRequestRequested
  | FriendRequestLoaded;
