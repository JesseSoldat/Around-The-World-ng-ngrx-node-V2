import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// modules
import { DashboardRoutingModule } from "./dashboard-routing.module";
// components
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
  imports: [CommonModule, DashboardRoutingModule],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
