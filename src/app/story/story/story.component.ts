import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap, tap, first, filter } from "rxjs/operators";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../_reducers";
// selectors
import { selectUserId } from "src/app/auth/auth.selectors";
import { selectStoryOverlay, selectStory } from "../story.selector";
// actions
import { MyStoriesRequested } from "../story.actions";
// models
import { Story } from "src/app/_models/story.model";

@Component({
  selector: "app-story",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.css"]
})
export class StoryComponent implements OnInit {
  overlay$: Observable<boolean>;
  story$: Observable<Story>;
  storyId: string;
  userId: string;
  btnTypes = {
    backBtn: true
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.toggleOverlay();
    this.getUserId();
    this.getStory();
  }

  // store & api calls
  toggleOverlay() {
    this.overlay$ = this.store.pipe(select(selectStoryOverlay));
  }

  getUserId() {
    this.store
      .pipe(
        select(selectUserId),
        filter(userId => userId !== null),
        first(),
        tap(userId => (this.userId = userId))
      )
      .subscribe();
  }

  getStory() {
    this.story$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.storyId = params.get("storyId");
        return this.store.select(selectStory(this.storyId));
      }),
      tap((story: Story) => {
        if (!story) this.store.dispatch(new MyStoriesRequested());
      })
    );
  }

  // events
  goBack() {
    this.router.navigateByUrl("/map/stories");
  }

  addImage() {
    this.router.navigateByUrl(`/imageUpload/${this.userId}/${this.storyId}`);
  }
}
