import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../../_reducers";
import { CloseModal } from "../modal.actions";

@Component({
  selector: "app-match-others-modal",
  templateUrl: "./match-others-modal.component.html",
  styleUrls: ["./match-others-modal.component.css"]
})
export class MatchOthersModalComponent implements OnInit {
  @ViewChild("modalRef") modalRef;
  @Input() modalType$: Observable<string | null>;
  @Input() modalData$: Observable<any>;
  data;

  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.modalType$.subscribe(type => {
      if (type === "matchUser") {
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
        if (event === 0) {
          this.closeModal();
        }
      }
    );
  }

  closeModal() {
    this.store.dispatch(new CloseModal());
    this.modalService.dismissAll();
  }

  closeModalAndRoute(match, event) {
    event.preventDefault();
    this.closeModal();
    const url = `/map/matches/stories/${match._id}`;
    this.router.navigateByUrl(url);
  }
}
