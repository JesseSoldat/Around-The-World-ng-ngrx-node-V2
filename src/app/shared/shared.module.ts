import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// modules
import { ReactiveFormsModule } from "@angular/forms";
// components
import { FormGroupComponent } from "./form-group/form-group.component";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FormGroupComponent],
  exports: [CommonModule, ReactiveFormsModule, FormGroupComponent]
})
export class SharedModule {}
