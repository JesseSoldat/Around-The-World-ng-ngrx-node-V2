import { Component, Output, Input, EventEmitter } from "@angular/core";

@Component({
  selector: "app-heading",
  templateUrl: "./heading.component.html",
  styleUrls: ["./heading.component.css"]
})
export class HeadingComponent {
  @Input() heading: string;
  @Input() btnTypes;

  @Output() btnClick: EventEmitter<string> = new EventEmitter();

  onBtnClick($event) {
    console.log("click type:", $event);

    this.btnClick.emit($event);
  }
}
