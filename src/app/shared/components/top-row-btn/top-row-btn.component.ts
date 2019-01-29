import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

const defaultBtnTypes = {
  backBtn: false,
  editBtn: false,
  deleteBtn: false,
  detailsBtn: false
};

@Component({
  selector: "app-top-row-btn",
  templateUrl: "./top-row-btn.component.html",
  styleUrls: ["./top-row-btn.component.css"]
})
export class TopRowBtnComponent implements OnInit {
  @Output() onBtnClick: EventEmitter<string> = new EventEmitter();
  @Input() btnTypes;

  ngOnInit() {
    const btnTypes = Object.assign(defaultBtnTypes, this.btnTypes);
  }

  btnClick(type: string) {
    this.onBtnClick.emit(type);
  }
}
