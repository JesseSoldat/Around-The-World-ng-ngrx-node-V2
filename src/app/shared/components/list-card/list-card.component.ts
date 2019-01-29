import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
// models
import { Story } from "../../../_models/story.model";
// data
const distances =
  "5,10,15,20,50,100,300,500,1000,1500,2000,2500,3000,5000,10000,100000";

@Component({
  selector: "app-list-card",
  templateUrl: "./list-card.component.html",
  styleUrls: ["./list-card.component.css"]
})
export class ListCardComponent implements OnInit {
  @Input() data: Story;
  matchesForm: FormGroup;
  distances: string[];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.distances = distances.split(",");
    this.initializeForm();
  }

  initializeForm() {
    this.matchesForm = this.formBuilder.group({
      storyId: [this.data._id],
      distances: [this.distances[0], [Validators.required]],
      distanceType: ["miles", [Validators.required]]
    });
  }

  handleSubmit() {}
}
