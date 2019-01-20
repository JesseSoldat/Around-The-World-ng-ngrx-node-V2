import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// modules
import { SharedModule } from "../shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
// components
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
  imports: [CommonModule, SharedModule, DashboardRoutingModule],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
