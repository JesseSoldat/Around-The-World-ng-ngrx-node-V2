import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { ToastrService } from "ngx-toastr";
// 3rd party
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../_reducers";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "angularfire2/storage";
// services
import { StoryService } from "../../_services/story.service";
// selectors
import { selectStoryOverlay } from "src/app/story/story.selector";
// models
import { StoryImage } from "../../_models/story-image";

@Component({
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.css"]
})
export class ImageUploadComponent implements OnInit {
  overlay$: Observable<boolean>;
  userId: string;
  storyId: string;
  btnTypes = {
    detailsBtn: true
  };
  // upload image
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot;
  downloadURL$: Observable<string>;
  isHovering: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private storyService: StoryService,
    private toastr: ToastrService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get("userId");
      this.storyId = params.get("storyId");
    });
  }

  // helpers
  handleError(err) {
    this.toastr.error("", err.msg, {
      timeOut: 3000,
      positionClass: "toast-bottom-right"
    });
  }

  // store / api calls
  toggleOverlay() {
    this.overlay$ = this.store.pipe(select(selectStoryOverlay));
  }

  // events
  goToStory() {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);

    // client-side validation
    if (!file || file.type.split("/")[0] !== "image") {
      return this.handleError({ msg: "The file type is not supported" });
    }

    if (!this.userId) {
      return this.handleError({
        msg: "A user id is required to upload a photo"
      });
    }

    const imageName = `story_${new Date().getTime()}`;

    const path = `aroundTheWorld/${this.userId}/story_images/${imageName}`;

    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, file);

    this.task
      .snapshotChanges()
      .pipe(
        tap(snapshot => (this.snapshot = snapshot)),
        finalize(() => {
          this.downloadURL$ = ref.getDownloadURL().pipe(
            tap((downloadURL: string) => {
              this.saveUrlRefToTheStory({
                path,
                downloadURL
              });
            })
          );
        })
      )
      .subscribe();

    this.percentage = this.task.percentageChanges();
  }

  saveUrlRefToTheStory(storyImg: StoryImage) {
    this.storyService
      .addImageToStory(storyImg, this.storyId)
      .subscribe(res => {}, err => {});
  }
}
