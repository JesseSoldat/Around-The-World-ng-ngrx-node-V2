import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// 3rd party
import { ToastrModule } from "ngx-toastr";
// modules
import { SharedModule } from "../shared/shared.module";
// routing
import { AppRoutingModule } from "../app-routing.module";
// services
import { HttpService } from "../_services/http.service";
import { AuthService } from "../_services/auth.service";
// components
import { NavbarComponent } from "./navbar/navbar.component";

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule,
    NavbarComponent
  ],
  providers: [HttpService, AuthService],
  declarations: [NavbarComponent]
})
export class CoreModule {}
