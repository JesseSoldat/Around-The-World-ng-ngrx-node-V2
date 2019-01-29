import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../_reducers";
// models
import { Location } from "../../_models/location.model";
import { Story } from "../../_models/story.model";
// services
import { StoryService } from "src/app/_services/story.service";
// selectors
import { selectStoryOverlay } from "../story.selector";

@Component({
  selector: "app-add-story",
  templateUrl: "./add-story.component.html",
  styleUrls: ["./add-story.component.css"]
})
export class AddStoryComponent implements OnInit {
  overlay$: Observable<boolean>;
  location: Location;
  zoom = 8;
  marker: Location;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private storyService: StoryService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(({ lng, lat }) => {
      this.location = {
        lng: parseFloat(lng),
        lat: parseFloat(lat)
      };
      this.marker = this.location;
    });

    this.toggleOverlay();
  }

  toggleOverlay() {
    this.overlay$ = this.store.pipe(select(selectStoryOverlay));
  }

  setMarker(event) {
    this.marker = event.coords;
  }

  handleCancel() {
    this.router.navigateByUrl("dashboard");
  }

  handleSubmit(values) {
    const { lng, lat } = this.location;

    const story: Story = {
      title: values.title,
      description: values.description,
      geometry: {
        type: "Point",
        coordinates: [lng, lat]
      }
    };

    this.storyService.createStory(story).subscribe(res => {}, err => {});
  }
}
