import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

// directives
import { BlurEventDirective } from "./directives/blur-event.directive";
// components
import { FormGroupComponent } from "./components/form-group/form-group.component";
import { LinkComponent } from "./components/link/link.component";
import { HeadingComponent } from "./components/heading/heading.component";
import { TileCardComponent } from "./components/tile-card/tile-card.component";

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [
    BlurEventDirective,
    FormGroupComponent,
    LinkComponent,
    HeadingComponent,
    TileCardComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormGroupComponent,
    LinkComponent,
    HeadingComponent,
    TileCardComponent,
    BlurEventDirective
  ]
})
export class SharedModule {}
