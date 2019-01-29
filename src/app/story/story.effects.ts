import { Injectable } from "@angular/core";
import { switchMap, map, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../_reducers";
// services
import { StoryService } from "../_services/story.service";
// models
import { HttpRes } from "../_models/http-res.model";
// actions
import {
  StoryError,
  MyStoriesRequested,
  MyStoriesLoaded,
  StoryActionTypes
} from "./story.actions";

@Injectable()
export class StoryEffects {
  constructor(
    private action$: Actions,
    private storyService: StoryService,
    private store: Store<AppState>
  ) {}

  // helpers
  handleError(error = null) {
    return new StoryError({ error });
  }

  @Effect() fetchStories$: Observable<
    MyStoriesLoaded | StoryError
  > = this.action$.pipe(
    ofType<MyStoriesRequested>(StoryActionTypes.MyStoriesRequested),
    switchMap(action =>
      this.storyService.getStories().pipe(
        map((res: HttpRes) => {
          if (!res) return this.handleError();
          const { payload } = res;
          return new MyStoriesLoaded({ stories: payload.stories });
        }),
        catchError(err => of(null))
      )
    )
  );
}
