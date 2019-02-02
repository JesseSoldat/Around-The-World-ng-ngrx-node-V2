import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { tap, filter, switchMap } from "rxjs/operators";
import { AuthState } from "../../auth/auth.reducer";
import { Store, select } from "@ngrx/store";
//actions
import { FriendRequestRequested } from "../../friend/friend.actions";
// selectors
import { selectIsAuth, selectUserId } from "../../auth/auth.selectors";
// services
import { AuthService } from "../../_services/auth.service";
// models
import { FriendRequest } from "../../_models/friend-request.model";
import { selectReceivedFriendRequests } from "src/app/friend/friend.selector";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isAuth$: Observable<boolean>;
  userId$: Observable<string>;
  brandLink: string;
  friendRequests: FriendRequest[];
  requestLength: number;

  constructor(
    private router: Router,
    private store: Store<AuthState>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkAuth();
    this.getUserId();
    this.getFriendRequests();
  }

  // store & api calls
  checkAuth(): void {
    this.isAuth$ = this.store.pipe(
      select(selectIsAuth),
      tap((isAuth: boolean) => {
        this.brandLink = isAuth ? "/dashboard" : "/";
      })
    );
  }

  getUserId(): void {
    this.userId$ = this.store.pipe(select(selectUserId));
  }

  getFriendRequests(): void {
    this.userId$
      .pipe(
        filter(userId => userId !== null),
        switchMap((userId: string) => {
          return this.store.select(selectReceivedFriendRequests(userId));
        }),
        tap((requests: FriendRequest[]) => {
          if (requests) {
            this.friendRequests = requests;
            this.requestLength = requests.length;
            return;
          }

          this.store.dispatch(new FriendRequestRequested());
        })
      )
      .subscribe();
  }
  // events
  navigateTo(): void {
    this.router.navigateByUrl(this.brandLink);
  }

  logout() {}
}
