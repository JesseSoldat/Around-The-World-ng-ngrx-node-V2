import { Component, Input } from "@angular/core";
// models
import { DashCard } from "../../../_models/dashCard.model";

@Component({
  selector: "app-tile-card",
  templateUrl: "./tile-card.component.html",
  styleUrls: ["./tile-card.component.css"]
})
export class TileCardComponent {
  @Input() data: DashCard;
}
