import { StoryActionTypes } from "./story.actions";
import { Story } from "../_models/story.model";

export interface StoryState {
  error: string;
  overlay: boolean;
  stories: Story[];
  otherPersonsStories: Story[];
}

export const initialStoryState: StoryState = {
  error: null,
  overlay: false,
  stories: null,
  otherPersonsStories: null
};

// helpers
const addStoryToStories = (prevStories, newStory) => {
  const stories = prevStories ? prevStories : [];
  return stories.unshift(newStory);
};

export function storyReducer(state = initialStoryState, action) {
  const { type, payload } = action;
  switch (type) {
    // -- show overlay --
    // add a new story
    case StoryActionTypes.AddStoryStarted:
      return { ...state, overlay: true };

    // -- hide overlay --
    case StoryActionTypes.AddStoryFinished:
      return {
        ...state,
        overlay: false,
        stories: addStoryToStories(state.stories, payload.update)
      };

    default:
      return { ...state };
  }
}
