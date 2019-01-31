import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
// 3rd party
import { ToastrModule } from "ngx-toastr";
// ngrx
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from "@ngrx/router-store";
import { EffectsModule } from "@ngrx/effects";
import { CustomSerializer } from "../_reducers/customSerialize";
import { reducers, metaReducers } from "../_reducers";
import { modalReducer } from "./modals/modal.reducer";
// firebase
import { AngularFireModule } from "angularfire2";
import { AngularFireStorageModule } from "angularfire2/storage";
// modules
import { SharedModule } from "../shared/shared.module";
// routing
import { AppRoutingModule } from "../app-routing.module";
// services
import { HttpService } from "../_services/http.service";
import { AuthService } from "../_services/auth.service";
import { StoryService } from "../_services/story.service";
// interceptors
import { AuthInterceptor } from "../_services/interceptors/auth.interceptor";
// guards
import { AuthGuard } from "../_services/guards/auth.guard";
// config
import { environment } from "src/environments/environment";
// components
import { NavbarComponent } from "./navbar/navbar.component";
import { ImageDetailModalComponent } from "./modals/image-detail-modal/image-detail-modal.component";
import { ModalManagerComponent } from "./modals/modal-manager/modal-manager.component";
import { MatchOthersModalComponent } from "./modals/match-others-modal/match-others-modal.component";

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    // firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature("modal", modalReducer),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([])
  ],
  exports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule,
    NavbarComponent,
    ModalManagerComponent,
    ImageDetailModalComponent,
    MatchOthersModalComponent
  ],
  providers: [
    HttpService,
    AuthService,
    StoryService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  declarations: [
    NavbarComponent,
    ImageDetailModalComponent,
    ModalManagerComponent,
    MatchOthersModalComponent
  ]
})
export class CoreModule {}
