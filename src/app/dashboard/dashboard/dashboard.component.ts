import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
// data
import { cardData } from "./cardData";
// models
import { DashCards } from "../../_models/dashCards.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  cardData$: Observable<DashCards>;

  ngOnInit() {
    this.cardData$ = of(cardData);
  }
}
