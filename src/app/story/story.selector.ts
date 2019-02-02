import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StoryState } from "./story.reducer";
// selectors
import { selectRouterState } from "../router.selector";
// models
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
    (stories: Story[]) => {
      if (stories === null) return null;
      return stories.find(story => story._id === storyId);
    }
  );
};

// other peoples stories
export const selectOtherPersonsStories = createSelector(
  selectStoryState,
  storyState => storyState.otherPersonsStories
);

export const selectOtherPersonsStory = (storyId: string) => {
  return createSelector(
    selectOtherPersonsStories,
    (stories: Story[]) => {
      if (!stories) return null;
      return stories.find(story => story._id === storyId);
    }
  );
};

// ------------ router -----------------

//"matches/story/:matchedUserId/:storyId"
export const selectMatchesStoryPageMatchedUserId = createSelector(
  selectRouterState,
  (state: any) => {
    if (!state) return null;

    return (
      state &&
      state.state &&
      state.state.params &&
      state.state.params.matchedUserId
    );
  }
);

//"matches/story/:matchedUserId/:storyId"
export const selectMatchesStoryPageStoryId = createSelector(
  selectRouterState,
  (state: any) => {
    if (!state) return null;
    console.log("router state", state);

    return (
      state && state.state && state.state.params && state.state.params.storyId
    );
  }
);
