import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { tap, switchMap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../../_reducers";
// selectors
import { selectOtherPersonsStories } from "../story.selector";
import { Story } from "src/app/_models/story.model";
// actions
import { OtherPersonsStoriesRequested } from "../story.actions";

@Component({
  selector: "app-matched-stories",
  templateUrl: "./matched-stories.component.html",
  styleUrls: ["./matched-stories.component.css"]
})
export class MatchedStoriesComponent implements OnInit {
  stories$: Observable<Story[]>;
  matchedUserId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.getStories();
  }

  // api calls
  getStories() {
    this.stories$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.matchedUserId = params.get("matchedUserId");
        return this.store.select(selectOtherPersonsStories);
      }),
      tap(stories => {
        // we have the correct stories
        if (stories !== null && this.matchedUserId === stories[0].user._id) {
          return;
        }
        // request from api
        this.store.dispatch(
          new OtherPersonsStoriesRequested({
            matchedUserId: this.matchedUserId
          })
        );
      })
    );
  }
}
