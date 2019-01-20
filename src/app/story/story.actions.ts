import { Action } from "@ngrx/store";
// models
import { Story } from "../_models/story.model";
import { Image } from "../_models/image.model";

export enum StoryActionTypes {
  // overlay
  AddStoryStarted = "AddStoryStarted",
  AddStoryFinished = "AddStoryFinished"
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

export type StoryActions = AddStoryStarted | AddStoryFinished;
