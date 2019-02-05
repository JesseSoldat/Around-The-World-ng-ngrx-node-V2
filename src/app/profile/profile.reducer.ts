// actions
import { ProfileActionTypes } from "./profile.actions";
import { AuthActionTypes } from "../auth/auth.actions";
// models
import { Profile } from "../_models/profile.model";

export interface ProfileState {
  overlay: boolean;
  error: string;
  profile: Profile;
}

export const initialProfileState: ProfileState = {
  overlay: false,
  error: null,
  profile: null
};

export function profileReducer(state = initialProfileState, action) {
  const { type, payload } = action;

  switch (type) {
    // clear profile state on logout
    case AuthActionTypes.LogoutAction:
      return {
        ...state,
        overlay: false,
        error: null,
        profile: null
      };

    // handle errors
    case ProfileActionTypes.ProfileError:
      return {
        ...state,
        error: payload.error
      };

    // fetch user profile
    case ProfileActionTypes.ProfileLoaded:
      return {
        ...state,
        error: null,
        profile: payload.profile
      };

    default:
      return { ...state };
  }
}
