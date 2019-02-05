import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../_reducers";
// selectors
import { selectFriends } from "../friend.selector";
// models
import { Profile } from "../../_models/profile.model";
import { NoDataInputs } from "../../_models/no-data-inputs.model";
// actions
import { FriendsRequested } from "../friend.actions";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.css"]
})
export class FriendsComponent implements OnInit {
  loadingStatus$: Observable<boolean>;
  friends$: Observable<Profile[]>;
  noDataInputs: NoDataInputs = {
    title: "No Friends",
    text: "Start matching with others from your story list!",
    btnIcon: "fas fa-atlas mr-2",
    btnText: "Go to Stories"
  };

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.requestFriends();
  }

  // store / api calls
  requestFriends() {
    this.friends$ = this.store.pipe(
      select(selectFriends),
      tap((friends: Profile[]) => {
        if (!friends) this.store.dispatch(new FriendsRequested());
      })
    );
  }

  // events
  searchForFriends() {
    this.router.navigateByUrl("/map/stories");
  }
}
