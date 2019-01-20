import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { Location } from "../../_models/location.model";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.css"]
})
export class LocationComponent {
  location: Location = {
    lng: -84.296312,
    lat: 33.774828
  };
  zoom = 4;
  marker: Location;
  locationIsSet = false;

  constructor(private router: Router) {}

  setMarker(event) {
    this.marker = event.coords;
  }

  setLocation() {
    this.router.navigate(["map/createStory", this.marker]);
  }

  cancel() {
    this.router.navigateByUrl("dashboard");
  }
}
