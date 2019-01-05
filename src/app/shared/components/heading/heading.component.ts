import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";

@Component({
  selector: "app-heading",
  templateUrl: "./heading.component.html",
  styleUrls: ["./heading.component.css"]
})
export class HeadingComponent implements OnInit {
  @Input() heading: string;
  @Input() backBtn: string;
  @Input() editBtn: string;
  @Input() deleteBtn: string;
  @Input() viewBtn: string;

  @Output() btnClick: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onBtnClick($event) {
    this.btnClick.emit($event);
  }
}
