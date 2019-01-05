import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

// components
import { FormGroupComponent } from "./components/form-group/form-group.component";
import { LinkComponent } from "./components/link/link.component";
import { HeadingComponent } from "./components/heading/heading.component";
// directives
import { BlurEventDirective } from "./directives/blur-event.directive";

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [
    BlurEventDirective,
    FormGroupComponent,
    LinkComponent,
    HeadingComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormGroupComponent,
    LinkComponent,
    HeadingComponent,
    BlurEventDirective
  ]
})
export class SharedModule {}
