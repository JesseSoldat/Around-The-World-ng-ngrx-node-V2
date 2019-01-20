import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// guards
import { AuthGuard } from "../_services/guards/auth.guard";
// components
import { LocationComponent } from "./location/location.component";
import { AddStoryComponent } from "./add-story/add-story.component";

const routes: Routes = [
  { path: "", component: LocationComponent, canActivate: [AuthGuard] },
  {
    path: "createStory",
    component: AddStoryComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoryRoutingModule {}
