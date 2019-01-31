import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { tap } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../_reducers";
// selectors
import { selectOtherPersonsStory } from "../story.selector";
import { selectFriends } from "../../friend/friend.selector";
// actions
import { OtherPersonsStoriesRequested } from "../story.actions";
import { FriendsRequested } from "../../friend/friend.actions";
// models
import { Story } from "../../_models/story.model";
import { Profile } from "../../_models/profile.model";
import { Image } from "../../_models/image.model";

@Component({
  selector: "app-matched-story",
  templateUrl: "./matched-story.component.html",
  styleUrls: ["./matched-story.component.css"]
})
export class MatchedStoryComponent implements OnInit {
  overlay$: Observable<boolean>;
  userId$: Observable<string>;
  story$: Observable<Story>;
  friends: Profile[];
  matchedUserId: string;
  storyId: string;
  status = "statusLoading";
  btnTypes = {
    backBtn: true
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.getRouteParams();
  }

  getRouteParams(): void {
    this.route.paramMap
      .pipe(
        tap((params: ParamMap) => {
          this.matchedUserId = params.get("matchedUserId");
          this.storyId = params.get("storyId");

          this.getFriends();
          this.getMatchedUsersStories(this.storyId);
        })
      )
      .subscribe();
  }

  // store / api calls
  getFriends(): void {
    this.store
      .pipe(
        select(selectFriends),
        tap((friends: Profile[] | null) => {
          if (!friends) return this.store.dispatch(new FriendsRequested());

          this.friends = friends;
        })
      )
      .subscribe();
  }

  getMatchedUsersStories(storyId: string): void {
    this.story$ = this.store.pipe(
      select(selectOtherPersonsStory(storyId)),
      tap((story: Story) => {
        if (!story) {
          this.store.dispatch(
            new OtherPersonsStoriesRequested({
              matchedUserId: this.matchedUserId
            })
          );
        }
      })
    );
  }

  // events
  goBack(): void {
    this.router.navigateByUrl(`/map/matches/stories/${this.matchedUserId}`);
  }

  viewImage(imgObj: Image): void {}

  sendFriendRequest(): void {}

  acceptFriendRequest(): void {}
}
