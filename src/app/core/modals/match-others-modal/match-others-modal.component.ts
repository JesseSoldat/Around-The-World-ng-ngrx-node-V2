import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { first, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../_reducers";
// actions
import { CloseModal } from "../modal.actions";
// selectors
import { selectNonFriendMatchedUsers } from "../../../friend/friend.selector";
// models
import { StoryMatch } from "../../../_models/story-match.model";

@Component({
  selector: "app-match-others-modal",
  templateUrl: "./match-others-modal.component.html",
  styleUrls: ["./match-others-modal.component.css"]
})
export class MatchOthersModalComponent implements OnInit {
  @ViewChild("modalRef") modalRef;
  @Input() modalType$: Observable<string | null>;
  @Input() modalData$: Observable<StoryMatch[]>;
  data: StoryMatch[];

  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.modalType$.subscribe(type => {
      if (type === "matchUser") {
        this.modalData$
          .pipe(first())
          .subscribe((matchedUsers: StoryMatch[]) => {
            this.store
              .pipe(
                select(selectNonFriendMatchedUsers(matchedUsers)),
                tap((filteredMatches: StoryMatch[]) => {
                  this.data = filteredMatches;
                  this.openModal();
                })
              )
              .subscribe();
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
