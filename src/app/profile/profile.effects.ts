import { Injectable } from "@angular/core";
import { switchMap, map, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
// models
import { HttpRes } from "../_models/http-res.model";
// services
import { ProfileService } from "../_services/profile.service";
// actions
import {
  ProfileError,
  ProfileRequested,
  ProfileLoaded,
  ProfileActionTypes
} from "./profile.actions";

@Injectable()
export class ProfileEffects {
  toastrOptions = {
    timeOut: 3000,
    positionClass: "toast-bottom-right"
  };

  constructor(
    private action$: Actions,
    private profileService: ProfileService,
    private toastr: ToastrService
  ) {}

  // helpers
  handleError(error: string = null) {
    this.toastr.error("", error, this.toastrOptions);

    return new ProfileError({ error });
  }

  @Effect()
  profileLoaded$: Observable<ProfileLoaded | ProfileError> = this.action$.pipe(
    ofType<ProfileRequested>(ProfileActionTypes.ProfileRequested),
    switchMap(action =>
      this.profileService.getProfile().pipe(
        map((res: HttpRes) => {
          if (!res) return this.handleError("Could not fetch the profile");

          return new ProfileLoaded({ profile: res.payload.profile });
        }),
        catchError(err => {
          this.handleError("Could not fetch the profile");
          return of(null);
        })
      )
    )
  );
}
