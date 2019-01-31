// actions
import { FriendActionTypes } from "./friend.actions";
import { AuthActionTypes } from "../auth/auth.actions";
// models
import { FriendRequest } from "../_models/friend-request.model";
import { Profile } from "../_models/profile.model";

export interface FriendState {
  overlay: boolean;
  spinner: boolean;
  error: string;
  friends: Profile[];
  friendRequests: FriendRequest[];
}

export const initialFriendState: FriendState = {
  overlay: false,
  spinner: false,
  error: null,
  friends: null,
  friendRequests: null
};

export function friendReducer(state = initialFriendState, action) {
  const { type, payload } = action;

  switch (type) {
    // clear all state
    case AuthActionTypes.LogoutAction:
      return {
        friends: null,
        friendRequests: null,
        friendRequestsDetails: null,
        error: null,
        spinner: false
      };

    // handle all errors
    case FriendActionTypes.FriendError:
      return { ...state, error: payload.error, spinner: false };

    // loading

    // get friends
    case FriendActionTypes.FriendsRequested:
      return {
        ...state,
        spinner: true
      };

    case FriendActionTypes.FriendsLoaded:
      return {
        ...state,
        friends: [...payload.friends],
        error: null,
        spinner: false
      };

    default:
      return {
        ...state
      };
  }
}