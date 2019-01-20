import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { storyReducer } from "./story.reducer";
// modules
import { SharedModule } from "../shared/shared.module";
import { StoryRoutingModule } from "./story-routing.module";
// components
import { LocationComponent } from "./location/location.component";
import { AddStoryComponent } from './add-story/add-story.component';
import { StoryFormComponent } from './add-story/story-form/story-form.component';

@NgModule({
  imports: [
    SharedModule,
    StoryRoutingModule,
    StoreModule.forFeature("story", storyReducer),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBqBYYfTpbE6RW2DDTUsws1zVV35OK2m3Y"
    })
  ],
  declarations: [LocationComponent, AddStoryComponent, StoryFormComponent]
})
export class StoryModule {}
