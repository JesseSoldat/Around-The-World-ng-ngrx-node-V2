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
): FriendRequest[] => {
  return prevFriendReq ? [...prevFriendReq, newFriendReq] : [newFriendReq];
};

const removeFriendRequest = (
  prevFriendReq: FriendRequest[],
  friendReqIdToRemove: string
): FriendRequest[] => {
  if (!prevFriendReq) return null;
  return prevFriendReq.filter(req => req._id !== friendReqIdToRemove);
};

export function friendReducer(state = initialFriendState, action) {
  const { type, payload } = action;

  switch (type) {
    // clear all state
    case AuthActionTypes.LogoutAction:
      return {
        overlay: false,
        friends: null,
        friendRequests: null,
        friendRequestsDetails: null,
        error: null,
        spinner: false
      };

    // handle all errors
    case FriendActionTypes.FriendError:
      return {
        ...state,
        error: payload.error,
        spinner: false,
        overlay: false
      };

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

    // -- small spinner --

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

    // accept friend request
    case FriendActionTypes.AcceptFriendRequestStarted:
      return {
        ...state,
        spinner: true
      };

    case FriendActionTypes.AcceptFriendRequestFinished:
      return {
        ...state,
        spinner: false,
        friends: [...payload.friends],
        friendRequests: removeFriendRequest(
          state.friendRequests,
          payload.friendRequestId
        )
      };

    default:
      return {
        ...state
      };
  }
}
