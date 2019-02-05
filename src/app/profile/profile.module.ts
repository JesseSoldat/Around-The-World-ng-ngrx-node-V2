import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { profileReducer } from "./profile.reducer";
import { ProfileEffects } from "./profile.effects";
// modules
import { ProfileRoutingModule } from "./profile-routing.module";
import { SharedModule } from "../shared/shared.module";
// components
import { ProfileComponent } from "./profile/profile.component";

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
    StoreModule.forFeature("profile", profileReducer),
    EffectsModule.forFeature([ProfileEffects])
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule {}
