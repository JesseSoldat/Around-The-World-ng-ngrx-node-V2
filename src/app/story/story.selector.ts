import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StoryState, storyReducer } from "./story.reducer";
import { Story } from "../_models/story.model";

export const selectStoryState = createFeatureSelector<StoryState>("story");

// overlay
export const selectStoryOverlay = createSelector(
  selectStoryState,
  storyState => storyState.overlay
);

// user stories
export const selectStoryList = createSelector(
  selectStoryState,
  storyState => storyState.stories
);

// user story
export const selectStory = (storyId: string) => {
  return createSelector(
    selectStoryList,
    stories => {
      if (stories === null) return null;
      return stories.find(story => story._id === storyId);
    }
  );
};

export const selectOtherPersonsStories = createSelector(
  selectStoryState,
  storyState => storyState.otherPersonsStories
);
