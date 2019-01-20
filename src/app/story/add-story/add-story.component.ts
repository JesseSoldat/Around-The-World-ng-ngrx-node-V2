import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../_reducers";
// models
import { Location } from "../../_models/location.model";
import { Story } from "../../_models/story.model";

@Component({
  selector: "app-add-story",
  templateUrl: "./add-story.component.html",
  styleUrls: ["./add-story.component.css"]
})
export class AddStoryComponent implements OnInit {
  location: Location;
  marker: Location;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe(({ lng, lat }) => {
      this.location = {
        lng: parseFloat(lng),
        lat: parseFloat(lat)
      };
      this.marker = this.location;
    });
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

    console.log(story);
  }
}
