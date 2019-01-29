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
  stories.unshift(newStory);
  return stories;
};

const addImageToStory = (prevStories, update) => {
  if (!prevStories) return null;
  const updatedStories = [...prevStories];
  const index = updatedStories.findIndex(story => story._id === update._id);

  if (index === -1) return null;

  updatedStories.splice(index, 1, update);

  return updatedStories;
};

export function storyReducer(state = initialStoryState, action) {
  const { type, payload } = action;
  switch (type) {
    // -- loading --
    case StoryActionTypes.MyStoriesLoaded:
      return { ...state, stories: [...payload.stories] };
    // -- show overlay --
    // add a new story
    case StoryActionTypes.AddStoryStarted:
    case StoryActionTypes.AddStoryImageStarted:
      return { ...state, overlay: true };

    // -- hide overlay --
    case StoryActionTypes.AddStoryFinished:
      return {
        ...state,
        overlay: false,
        stories: addStoryToStories(state.stories, payload.update)
      };

    case StoryActionTypes.AddStoryImageFinished:
      return {
        ...state,
        overlay: false,
        stories: addImageToStory(state.stories, payload.update)
      };

    default:
      return { ...state };
  }
}
