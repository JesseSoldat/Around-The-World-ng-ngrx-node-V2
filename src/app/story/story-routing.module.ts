import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// guards
import { AuthGuard } from "../_services/guards/auth.guard";
// components
import { LocationComponent } from "./location/location.component";
import { AddStoryComponent } from "./add-story/add-story.component";
import { StoriesComponent } from "./stories/stories.component";
import { StoryComponent } from "./story/story.component";

const routes: Routes = [
  { path: "", component: LocationComponent, canActivate: [AuthGuard] },
  {
    path: "createStory",
    component: AddStoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "stories",
    component: StoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "story/:userId/:storyId",
    component: StoryComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoryRoutingModule {}
