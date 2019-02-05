import { Action } from "@ngrx/store";
// models
import { Profile } from "../_models/profile.model";

export enum ProfileActionTypes {
  ProfileError = "ProfileError",
  ProfileRequested = "ProfileRequested",
  ProfileLoaded = "ProfileLoaded"
}

// handle all profile errors
export class ProfileError implements Action {
  readonly type = ProfileActionTypes.ProfileError;

  constructor(public payload: { error: string }) {}
}

// get a profile
export class ProfileRequested implements Action {
  readonly type = ProfileActionTypes.ProfileRequested;
}

export class ProfileLoaded implements Action {
  readonly type = ProfileActionTypes.ProfileLoaded;

  constructor(public payload: { profile: Profile }) {}
}

export type ProfileActions = ProfileError | ProfileRequested | ProfileLoaded;
