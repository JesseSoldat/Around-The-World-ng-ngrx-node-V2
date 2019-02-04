import { Story } from "./story.model";
import { Profile } from "./profile.model";

export interface StoryMatch {
  stories: Story[];
  userInfo: Profile;
  length: number;
  _id: string;
}
