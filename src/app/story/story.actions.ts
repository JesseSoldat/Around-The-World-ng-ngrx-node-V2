import { Action } from "@ngrx/store";
// models
import { Story } from "../_models/story.model";
import { Image } from "../_models/image.model";
import { MatchQuery } from "../_models/match-query.model";

export enum StoryActionTypes {
  StoryError = "StoryError",
  // overlay
  AddStoryStarted = "AddStoryStarted",
  AddStoryFinished = "AddStoryFinished",
  AddStoryImageStarted = "AddStoryImageStarted",
  AddStoryImageFinished = "AddStoryImageFinished",
  MatchOtherUsersStarted = "MatchOtherUsersStarted",
  MatchOtherUsersFinished = "MatchOtherUsersFinished",
  // loading
  MyStoriesRequested = "MyStoriesRequested",
  MyStoriesLoaded = "MyStoriesLoaded",
  OtherPersonsStoriesRequested = "OtherPersonsStoriesRequested",
  OtherPersonsStoriesLoaded = "OtherPersonsStoriesLoaded"
}

// errors
export class StoryError implements Action {
  readonly type = StoryActionTypes.StoryError;

  constructor(public payload: { error: string }) {}
}

// overlays

// add a new story
export class AddStoryStarted implements Action {
  readonly type = StoryActionTypes.AddStoryStarted;
}

export class AddStoryFinished implements Action {
  readonly type = StoryActionTypes.AddStoryFinished;

  constructor(public payload: { update: Story }) {}
}

// add an image to a story

export class AddStoryImageStarted implements Action {
  readonly type = StoryActionTypes.AddStoryImageStarted;
}

export class AddStoryImageFinished implements Action {
  readonly type = StoryActionTypes.AddStoryImageFinished;

  constructor(public payload: { update: Story }) {}
}

// match other users stories to your story

export class MatchOtherUsersStarted implements Action {
  readonly type = StoryActionTypes.MatchOtherUsersStarted;

  constructor(public payload: { matchQuery: MatchQuery }) {}
}

export class MatchOtherUsersFinished implements Action {
  readonly type = StoryActionTypes.MatchOtherUsersFinished;
}

// loading

// fetch stories
export class MyStoriesRequested implements Action {
  readonly type = StoryActionTypes.MyStoriesRequested;
}

export class MyStoriesLoaded implements Action {
  readonly type = StoryActionTypes.MyStoriesLoaded;

  constructor(public payload: { stories: Story[] }) {}
}

// other persons stories loaded

export class OtherPersonsStoriesRequested implements Action {
  readonly type = StoryActionTypes.OtherPersonsStoriesRequested;

  constructor(public payload: { matchedUserId: string }) {}
}

export class OtherPersonsStoriesLoaded implements Action {
  readonly type = StoryActionTypes.OtherPersonsStoriesLoaded;

  constructor(public payload: { stories: Story[] }) {}
}

export type StoryActions =
  | AddStoryStarted
  | AddStoryFinished
  | MyStoriesRequested
  | MyStoriesLoaded
  | AddStoryImageStarted
  | AddStoryImageFinished
  | MatchOtherUsersStarted
  | MatchOtherUsersFinished
  | OtherPersonsStoriesRequested
  | OtherPersonsStoriesLoaded;
