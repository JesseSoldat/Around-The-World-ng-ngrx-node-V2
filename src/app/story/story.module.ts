import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { storyReducer } from "./story.reducer";
import { StoryEffects } from "./story.effects";
// modules
import { SharedModule } from "../shared/shared.module";
import { StoryRoutingModule } from "./story-routing.module";
// components
import { LocationComponent } from "./location/location.component";
import { AddStoryComponent } from "./add-story/add-story.component";
import { StoryFormComponent } from "./add-story/story-form/story-form.component";
import { StoriesComponent } from "./stories/stories.component";
import { StoryComponent } from './story/story.component';
import { MatchedStoriesComponent } from './matched-stories/matched-stories.component';
import { MatchedStoryComponent } from './matched-story/matched-story.component';
import { FriendsPhotosComponent } from './matched-story/friends-photos/friends-photos.component';

@NgModule({
  imports: [
    SharedModule,
    StoryRoutingModule,
    StoreModule.forFeature("story", storyReducer),
    EffectsModule.forFeature([StoryEffects]),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBqBYYfTpbE6RW2DDTUsws1zVV35OK2m3Y"
    })
  ],
  declarations: [
    LocationComponent,
    AddStoryComponent,
    StoryFormComponent,
    StoriesComponent,
    StoryComponent,
    MatchedStoriesComponent,
    MatchedStoryComponent,
    FriendsPhotosComponent
  ]
})
export class StoryModule {}
