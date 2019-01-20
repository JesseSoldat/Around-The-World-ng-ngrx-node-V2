import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
// ngrx
import { AuthState } from "../../auth/auth.reducer";
import { Store, select } from "@ngrx/store";
import { selectIsAuth } from "../../auth/auth.selectors";
// services
import { AuthService } from "../../_services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isAuth$: Observable<boolean>;
  brandLink: string;

  constructor(
    private router: Router,
    private store: Store<AuthState>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkAuth();
  }

  checkAuth(): void {
    this.isAuth$ = this.store.pipe(
      select(selectIsAuth),
      tap((isAuth: boolean) => {
        this.brandLink = isAuth ? "/dashboard" : "/";
      })
    );
  }

  navigateTo(): void {
    this.router.navigateByUrl(this.brandLink);
  }
}
