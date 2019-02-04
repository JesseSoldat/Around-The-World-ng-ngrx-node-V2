import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { tap, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "../_reducers";
// models
import { HttpRes } from "../_models/http-res.model";
import { Story } from "../_models/story.model";
import { StoryImage } from "../_models/story-image";
import { MatchQuery } from "../_models/match-query.model";
// services
import { HttpService } from "./http.service";
// selectors
import { selectUserId } from "../auth/auth.selectors";
// actions
import {
  AddStoryStarted,
  AddStoryFinished,
  AddStoryImageStarted,
  AddStoryImageFinished
} from "../story/story.actions";
import { OpenModal } from "../core/modals/modal.actions";
import { FriendsLoaded } from "../friend/friend.actions";
// models
import { StoryMatch } from "../_models/story-match.model";
import { Profile } from "../_models/profile.model";

@Injectable()
export class StoryService {
  userId: string;
  toastrOptions = {
    timeOut: 3000,
    positionClass: "toast-bottom-right"
  };

  constructor(
    private httpService: HttpService,
    private store: Store<AppState>,
    private toastr: ToastrService
  ) {
    this.setUserId();
  }

  // helpers
  handleError(err) {
    console.error("story service handleError:", err);

    this.toastr.error("", err.error.msg, this.toastrOptions);

    return of({ msg: err.error.msg, payload: null });
  }

  handleSuccess(msg) {
    this.toastr.success("", msg, this.toastrOptions);
  }

  setUserId() {
    this.store
      .pipe(
        select(selectUserId),
        tap((userId: string) => (this.userId = userId))
      )
      .subscribe();
  }

  // api calls
  getStories(): Observable<HttpRes | null> {
    if (!this.userId) return of(null);

    return this.httpService
      .httpGetRequest(`story/${this.userId}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  createStory(story: Story): Observable<HttpRes | null> {
    if (!this.userId) return of(null);

    this.store.dispatch(new AddStoryStarted());
    return this.httpService
      .httpPostRequest(`story/add/${this.userId}`, story)
      .pipe(
        tap((res: HttpRes) => {
          const { msg, payload } = res;
          const { story } = payload;

          this.handleSuccess(msg);

          this.store.dispatch(new AddStoryFinished({ update: story }));
        }),
        catchError(err => this.handleError(err))
      );
  }

  addImageToStory(
    storyImg: StoryImage,
    storyId: string
  ): Observable<HttpRes | null> {
    if (!this.userId) return of(null);

    this.store.dispatch(new AddStoryImageStarted());
    return this.httpService
      .httpPatchRequest(`story/addImage/${this.userId}/${storyId}`, {
        storyImg
      })
      .pipe(
        tap((res: HttpRes) => {
          console.log("res", res);

          const { msg, payload } = res;
          const { story } = payload;

          this.handleSuccess(msg);

          this.store.dispatch(new AddStoryImageFinished({ update: story }));
        }),
        catchError(err => this.handleError(err))
      );
  }

  matchOtherUsers(matchQuery: MatchQuery): Observable<HttpRes | null> {
    if (!this.userId) return of(null);

    const { unit, maxDistance, coordinates } = matchQuery;

    const lng = coordinates[0];
    const lat = coordinates[1];

    const url = `story/match/${
      this.userId
    }?lat=${lat}&lng=${lng}&unit=${unit}&maxDistance=${maxDistance}`;

    return this.httpService.httpGetRequest(url).pipe(
      tap((res: HttpRes) => {
        const { payload } = res;

        const friends: Profile[] = payload.friends;
        const storyMatch: StoryMatch[] = payload.matches;

        this.store.dispatch(new FriendsLoaded({ friends }));

        this.store.dispatch(
          new OpenModal({ modalType: "matchUser", data: storyMatch })
        );
      }),
      catchError(err => this.handleError(err.error))
    );
  }

  getOtherPersonsStories(matchedUserId: string): Observable<HttpRes | null> {
    if (!this.userId) return of(null);

    return this.httpService
      .httpGetRequest(`matched/story/${this.userId}/${matchedUserId}`)
      .pipe(catchError(err => this.handleError(err)));
  }
}
