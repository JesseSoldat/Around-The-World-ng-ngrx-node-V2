import { Component, OnInit, Input, ViewChild } from "@angular/core";
// 3rd party
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { first } from "rxjs/operators";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../../_reducers";
// actions
import { CloseModal } from "../modal.actions";
// models
import { Image } from "../../../_models/image.model";

@Component({
  selector: "app-image-detail-modal",
  templateUrl: "./image-detail-modal.component.html",
  styleUrls: ["./image-detail-modal.component.css"]
})
export class ImageDetailModalComponent implements OnInit {
  @Input() modalData$: Observable<Image>;
  @Input() modalType$: Observable<string>;
  data: Image;
  @ViewChild("modalRef") modalRef: NgbModal;

  constructor(private store: Store<AppState>, private modalService: NgbModal) {}

  ngOnInit() {
    this.modalType$.subscribe(type => {
      if (type === "imageDetails") {
        this.modalData$.pipe(first()).subscribe(data => {
          this.data = data;
          this.openModal();
        });
      }
    });
  }

  openModal() {
    const modal = this.modalService.open(this.modalRef);
    modal.result.then(
      () => {},
      event => {
        // event === 0 is a background click
        if (event === 0) this.closeModal();
      }
    );
  }

  closeModal() {
    this.store.dispatch(new CloseModal());
    this.modalService.dismissAll();
  }
}
