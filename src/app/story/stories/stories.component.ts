import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../_reducers";
// models
import { Story } from "../../_models/story.model";
import { SearchDistance } from "../../_models/search-distance.model";
import { CoordinatesById } from "../../_models/coordinatesById";
// selectors
import { selectStoryList } from "../story.selector";
// actions
import { MyStoriesRequested } from "../story.actions";

@Component({
  selector: "app-stories",
  templateUrl: "./stories.component.html",
  styleUrls: ["./stories.component.css"]
})
export class StoriesComponent implements OnInit {
  stories$: Observable<Story[]>;
  coordinatesById: CoordinatesById;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.fetchStories();
  }

  // helpers
  createCoordinatesById(storyList: Story[]) {
    const coordinatesById: CoordinatesById = {};
    storyList.forEach(story => {
      coordinatesById[story._id] = story.geometry.coordinates;
    });
  }

  // store & api calls
  fetchStories() {
    this.stories$ = this.store.pipe(
      select(selectStoryList),
      tap((storyList: Story[]) => {
        console.log("stories", storyList);

        if (storyList !== null) {
          return this.createCoordinatesById(storyList);
        }
        // fetch stories from server
        this.store.dispatch(new MyStoriesRequested());
      })
    );
  }
}
