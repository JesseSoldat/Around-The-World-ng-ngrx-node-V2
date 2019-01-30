import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { shareReplay } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../_reducers";
// selectors
import { selectModalType, selectModalData } from "../modal.selector";
// models
import { Image } from "src/app/_models/image.model";

@Component({
  selector: "app-modal-manager",
  templateUrl: "./modal-manager.component.html",
  styleUrls: ["./modal-manager.component.css"]
})
export class ModalManagerComponent implements OnInit {
  modalData$: Observable<Image | null>;
  modalType$: Observable<string | null>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.modalType$ = this.store.pipe(
      select(selectModalType),
      shareReplay()
    );

    this.modalData$ = this.store.pipe(select(selectModalData));
  }
}
