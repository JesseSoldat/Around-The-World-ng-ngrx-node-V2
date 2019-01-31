import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// components
import { LocationComponent } from "./location/location.component";
import { AddStoryComponent } from "./add-story/add-story.component";
import { StoriesComponent } from "./stories/stories.component";
import { StoryComponent } from "./story/story.component";
import { MatchedStoriesComponent } from "./matched-stories/matched-stories.component";
import { MatchedStoryComponent } from "./matched-story/matched-story.component";

const routes: Routes = [
  { path: "", component: LocationComponent },
  {
    path: "createStory",
    component: AddStoryComponent
  },
  {
    path: "stories",
    component: StoriesComponent
  },
  {
    path: "story/:userId/:storyId",
    component: StoryComponent
  },
  {
    path: "matches/stories/:matchedUserId",
    component: MatchedStoriesComponent
  },
  {
    path: "matches/story/:matchedUserId/:storyId",
    component: MatchedStoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoryRoutingModule {}
