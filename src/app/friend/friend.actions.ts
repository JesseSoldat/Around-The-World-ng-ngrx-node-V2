import { Action } from "@ngrx/store";
// models
import { Profile } from "../_models/profile.model";
import { FriendRequest } from "../_models/friend-request.model";

export enum FriendActionTypes {
  FriendError = "FriendError",
  // loading
  FriendsRequested = "FriendsRequested",
  FriendsLoaded = "FriendsLoaded"
}

// handle all profile errors
export class FriendError implements Action {
  readonly type = FriendActionTypes.FriendError;

  constructor(public payload: { error: string }) {}
}

// get friends
export class FriendsRequested implements Action {
  readonly type = FriendActionTypes.FriendsRequested;
}

export class FriendsLoaded implements Action {
  readonly type = FriendActionTypes.FriendsLoaded;

  constructor(public payload: { friends: Profile[] }) {}
}

export type FriendActions = FriendError | FriendsRequested | FriendsLoaded;
