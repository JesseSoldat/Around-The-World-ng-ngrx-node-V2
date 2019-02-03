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

// helpers
const sendFriendRequest = (
  prevFriendReq: FriendRequest[],
  newFriendReq: FriendRequest
) => {
  return prevFriendReq ? [...prevFriendReq, newFriendReq] : [newFriendReq];
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

    // -- loading --

    // get friend requests
    case FriendActionTypes.FriendRequestLoaded:
      return {
        ...state,
        friendRequests: [...payload.friendRequests]
      };

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

    // -- overlay --

    // send friend request
    case FriendActionTypes.SendFriendRequestStarted:
      return {
        ...state,
        spinner: true
      };

    case FriendActionTypes.SendFriendRequestFinished:
      return {
        ...state,
        spinner: false,
        friendRequests: sendFriendRequest(
          state.friendRequests,
          payload.friendRequest
        )
      };

    default:
      return {
        ...state
      };
  }
}
