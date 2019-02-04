import { Component, Input, Output, EventEmitter } from "@angular/core";

import { NoDataInputs } from "../../../_models/no-data-inputs.model";

@Component({
  selector: "app-no-data",
  templateUrl: "./no-data.component.html",
  styleUrls: ["./no-data.component.css"]
})
export class NoDataComponent {
  @Output() btnClick: EventEmitter<void> = new EventEmitter();
  @Input() data: NoDataInputs;

  onBtnClick(): void {
    this.btnClick.emit();
  }
}
