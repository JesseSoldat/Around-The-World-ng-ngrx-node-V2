import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { friendReducer } from "./friend.reducer";
// modules
import { SharedModule } from "../shared/shared.module";
import { FriendRoutingModule } from "./friend-routing.module";

@NgModule({
  imports: [
    SharedModule,
    FriendRoutingModule,
    StoreModule.forFeature("friend", friendReducer)
  ],
  exports: [FriendRoutingModule],
  declarations: []
})
export class FriendModule {}
