import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// 3rd party
import { ToastrModule } from "ngx-toastr";
// routing
import { AppRoutingModule } from "../app-routing.module";
// services
import { HttpService } from "../_services/http.service";
import { AuthService } from "../_services/auth.service";

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule
  ],
  providers: [HttpService, AuthService]
})
export class CoreModule {}
