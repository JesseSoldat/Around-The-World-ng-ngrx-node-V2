import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
// ngrx
import { Store, select } from "@ngrx/store";
import { AuthState } from "../../auth/auth.reducer";
import { selectIsAuth } from "../../auth/auth.selectors";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthState>, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(selectIsAuth),
      tap(isAuth => {
        // console.log("guard", isAuth);

        if (!isAuth) {
          this.router.navigateByUrl("/login");
        }
      })
    );
  }
}
