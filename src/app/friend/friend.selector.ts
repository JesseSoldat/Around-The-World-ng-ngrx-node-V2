import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FriendState } from "./friend.reducer";
// models
import { FriendRequest } from "../_models/friend-request.model";

// friend state
export const selectFriendState = createFeatureSelector<FriendState>("friend");

// errors
export const selectError = createSelector(
  selectFriendState,
  (friendState: FriendState) => friendState.error
);

// overlay
export const selectFriendOverlay = createSelector(
  selectFriendState,
  (friendState: FriendState) => friendState.overlay
);

// small spinner
export const selectLoadingSpinner = createSelector(
  selectFriendState,
  (friendState: FriendState) => friendState.spinner
);

// get all of my friends
export const selectFriends = createSelector(
  selectFriendState,
  (friendState: FriendState) => friendState.friends
);
