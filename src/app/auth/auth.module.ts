import { NgModule } from "@angular/core";

// modules
import { SharedModule } from "../shared/shared.module";
// routing
import { AuthRoutingModule } from "./auth-routing.module";
// components
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [SharedModule, AuthRoutingModule],
  declarations: [RegisterComponent, LoginComponent]
})
export class AuthModule {}
