import { NgModule } from "@angular/core";
// ngrx
import { StoreModule } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./auth.effects";
// modules
import { SharedModule } from "../shared/shared.module";
// routing
import { AuthRoutingModule } from "./auth-routing.module";
// components
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    StoreModule.forFeature("auth", fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [RegisterComponent, LoginComponent]
})
export class AuthModule {}
