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
  getStories(): Observable<HttpRes> {
    if (!this.userId) return of(null);

    return this.httpService
      .httpGetRequest(`story/${this.userId}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  createStory(story: Story): Observable<HttpRes> {
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

  addImageToStory(storyImg: StoryImage, storyId: string): Observable<HttpRes> {
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
}
