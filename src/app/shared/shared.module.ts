import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// modules
import { ReactiveFormsModule } from "@angular/forms";
// components
import { FormGroupComponent } from "./components/form-group/form-group.component";
// directives
import { BlurEventDirective } from "./directives/blur-event.directive";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FormGroupComponent, BlurEventDirective],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormGroupComponent,
    BlurEventDirective
  ]
})
export class SharedModule {}
