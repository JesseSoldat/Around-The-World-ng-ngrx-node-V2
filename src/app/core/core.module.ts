import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

// routing
import { AppRoutingModule } from "../app-routing.module";

@NgModule({
  imports: [HttpClientModule, AppRoutingModule],
  exports: [AppRoutingModule]
})
export class CoreModule {}
