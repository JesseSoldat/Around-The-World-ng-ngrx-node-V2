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
import { MatchQuery } from "../../_models/match-query.model";
// selectors
import { selectStoryList } from "../story.selector";
// actions
import { MyStoriesRequested, MatchOtherUsersStarted } from "../story.actions";
import { NoDataInputs } from "src/app/_models/no-data-inputs.model";

@Component({
  selector: "app-stories",
  templateUrl: "./stories.component.html",
  styleUrls: ["./stories.component.css"]
})
export class StoriesComponent implements OnInit {
  stories$: Observable<Story[]>;
  coordinatesById: CoordinatesById;
  noDataInputs: NoDataInputs = {
    title: "No Stories",
    text: "Create some stories to get started matching with others",
    btnIcon: "fas fa-map mr-2",
    btnText: "Go to Map"
  };

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

    this.coordinatesById = coordinatesById;
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

  // events
  searchForFriendsByDistance(form: SearchDistance) {
    const matchQuery: MatchQuery = {
      coordinates: this.coordinatesById[form.storyId],
      maxDistance: parseInt(form.distances),
      unit: form.distanceType
    };

    this.store.dispatch(new MatchOtherUsersStarted({ matchQuery }));
  }

  goToMap() {
    this.router.navigateByUrl("/map");
  }
}
