import { Action } from "@ngrx/store";
// models
import { Story } from "../_models/story.model";
import { Image } from "../_models/image.model";

export enum StoryActionTypes {
  StoryError = "StoryError",
  // overlay
  AddStoryStarted = "AddStoryStarted",
  AddStoryFinished = "AddStoryFinished",
  AddStoryImageStarted = "AddStoryImageStarted",
  AddStoryImageFinished = "AddStoryImageFinished",
  // loading
  MyStoriesRequested = "MyStoriesRequested",
  MyStoriesLoaded = "MyStoriesLoaded"
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

// errors
export class StoryError implements Action {
  readonly type = StoryActionTypes.StoryError;

  constructor(public payload: { error: string }) {}
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

// overlay

export class AddStoryImageStarted implements Action {
  readonly type = StoryActionTypes.AddStoryImageStarted;
}

export class AddStoryImageFinished implements Action {
  readonly type = StoryActionTypes.AddStoryImageFinished;

  constructor(public payload: { update: Story }) {}
}

export type StoryActions =
  | AddStoryStarted
  | AddStoryFinished
  | MyStoriesRequested
  | MyStoriesLoaded
  | AddStoryImageStarted
  | AddStoryImageFinished;
