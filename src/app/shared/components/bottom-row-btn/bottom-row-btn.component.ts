import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

const defaultBtnTypes = {
  backBtn: false,
  editBtn: false,
  deleteBtn: false,
  detailsBtn: false
};

@Component({
  selector: "app-bottom-row-btn",
  templateUrl: "./bottom-row-btn.component.html",
  styleUrls: ["./bottom-row-btn.component.css"]
})
export class BottomRowBtnComponent implements OnInit {
  @Output() onBtnClick: EventEmitter<string> = new EventEmitter();

  @Input() btnTypes;

  ngOnInit() {
    const btnTypes = Object.assign(defaultBtnTypes, this.btnTypes);
  }

  btnClick(type: string) {
    this.onBtnClick.emit(type);
  }
}
