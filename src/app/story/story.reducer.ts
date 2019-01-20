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

export function storyReducer(state = initialStoryState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return { ...state };
  }
}
