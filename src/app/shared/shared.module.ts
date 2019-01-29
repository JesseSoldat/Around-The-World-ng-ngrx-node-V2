import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
// ng bootstrap
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// directives
import { BlurEventDirective } from "./directives/blur-event.directive";
import { DropZoneDirective } from "./directives/drop-zone.directive";
// components
import { FormGroupComponent } from "./components/form-group/form-group.component";
import { LinkComponent } from "./components/link/link.component";
import { HeadingComponent } from "./components/heading/heading.component";
import { TileCardComponent } from "./components/tile-card/tile-card.component";
import { OverlayComponent } from "./components/overlay/overlay.component";
import { ListCardComponent } from "./components/list-card/list-card.component";
import { BottomRowBtnComponent } from "./components/bottom-row-btn/bottom-row-btn.component";
import { TopRowBtnComponent } from "./components/top-row-btn/top-row-btn.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgbModule],
  declarations: [
    BlurEventDirective,
    DropZoneDirective,
    FormGroupComponent,
    LinkComponent,
    HeadingComponent,
    TileCardComponent,
    OverlayComponent,
    ListCardComponent,
    BottomRowBtnComponent,
    TopRowBtnComponent,
    SpinnerComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    BlurEventDirective,
    DropZoneDirective,
    FormGroupComponent,
    LinkComponent,
    HeadingComponent,
    TileCardComponent,
    OverlayComponent,
    ListCardComponent,
    BottomRowBtnComponent,
    SpinnerComponent
  ]
})
export class SharedModule {}
