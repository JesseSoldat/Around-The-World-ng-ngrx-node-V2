import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FriendState } from "./friend.reducer";
// models
import { FriendRequest } from "../_models/friend-request.model";
import { Profile } from "../_models/profile.model";
// selectors
import { selectUserId } from "../auth/auth.selectors";
import { selectMatchesStoryPageMatchedUserId } from "../story/story.selector";
import { StoryMatch } from "../_models/story-match.model";

// friend state
export const selectFriendState = createFeatureSelector<FriendState>("friend");

// errors
export const selectError = createSelector(
  selectFriendState,
  (friendState: FriendState): string => friendState.error
);

// overlay
export const selectFriendOverlay = createSelector(
  selectFriendState,
  (friendState: FriendState): boolean => friendState.overlay
);

// small spinner
export const selectLoadingSpinner = createSelector(
  selectFriendState,
  (friendState: FriendState): boolean => friendState.spinner
);

// get all of my friends
export const selectFriends = createSelector(
  selectFriendState,
  (friendState: FriendState): Profile[] => friendState.friends
);

// get all of my friend requests
export const selectFriendRequest = createSelector(
  selectFriendState,
  (friendState: FriendState): FriendRequest[] => friendState.friendRequests
);

// check if I have received any friend requests
export const selectReceivedFriendRequests = (userId: string) =>
  createSelector(
    selectFriendRequest,
    (requests: FriendRequest[]): FriendRequest[] => {
      if (!userId || requests === null) return null;
      return requests.filter(req => req.recipient._id === userId);
    }
  );

// check if user is a friend
export const selectIsMyFriend = createSelector(
  selectMatchesStoryPageMatchedUserId,
  selectFriends,
  (matchedUserId: string, friends: Profile[]): string => {
    if (friends === null) return null;

    const index: number = friends.findIndex(
      friend => friend._id === matchedUserId
    );

    return index >= 0 ? "isFriend" : "isNotFriend";
  }
);

// check if already received a request from the matching user
export const selectReceivedRequestByMatchingUser = createSelector(
  selectMatchesStoryPageMatchedUserId,
  selectUserId,
  selectFriendRequest,
  (
    matchedUserId: string,
    userId: string,
    friendRequests: FriendRequest[]
  ): String => {
    if (!matchedUserId || !userId || friendRequests === null) return null;

    const request = friendRequests.find(
      req => req.recipient._id === userId && req.requester._id === matchedUserId
    );

    return request ? request.status : "didNotReceiveRequest";
  }
);

// check if I sent a request to this person or not
export const selectSentFriendRequestToMatchingUser = createSelector(
  selectMatchesStoryPageMatchedUserId,
  selectFriendRequest,
  (matchedUserId: string, friendRequests: FriendRequest[]): String => {
    if (!matchedUserId || friendRequests === null) return null;

    let request = friendRequests.find(
      obj => obj.recipient._id === matchedUserId
    );

    console.log("friendRequests", friendRequests);

    return request ? request.status : "didNotSendRequest";
  }
);

// check for friends, received request, and sent request | return 'status'
export const selectMatchedUserStatus = createSelector(
  selectIsMyFriend,
  selectReceivedRequestByMatchingUser,
  selectSentFriendRequestToMatchingUser,
  (isFriend: string, receivedRequest: string, sentRequest: string): string => {
    if (isFriend === "isFriend") return isFriend;

    if (isFriend && receivedRequest && sentRequest) {
      if (receivedRequest === "requested") return "receivedRequest";
      else if (sentRequest === "requested") return "sentRequest";
      else return "notRequested";
    }
    return "statusLoading";
  }
);

// filter friends from matchedUsers list
export const selectNonFriendMatchedUsers = (matchedUsers: StoryMatch[]) =>
  createSelector(
    selectFriends,
    (friends: Profile[]): StoryMatch[] => {
      if (matchedUsers === null || friends === null) return null;

      // console.log("friends", friends);
      // console.log("matchedUsers", matchedUsers);

      const friendIdsArray = friends.map((friend: Profile) => friend._id);

      const filteredMatchedUsers = matchedUsers.filter(
        (matchedUser: StoryMatch) => {
          const index = friendIdsArray.findIndex(
            (id: string) => id === matchedUser.userInfo[0]._id
          );

          if (index === -1) return matchedUser;
        }
      );

      // console.log("filteredMatchedUsers", filteredMatchedUsers);

      return filteredMatchedUsers;
    }
  );
