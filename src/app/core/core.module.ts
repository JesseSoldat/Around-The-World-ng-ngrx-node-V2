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
// components
import { NavbarComponent } from "./navbar/navbar.component";
import { environment } from "src/environments/environment";

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
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([])
  ],
  exports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule,
    NavbarComponent
  ],
  providers: [
    HttpService,
    AuthService,
    StoryService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  declarations: [NavbarComponent]
})
export class CoreModule {}
