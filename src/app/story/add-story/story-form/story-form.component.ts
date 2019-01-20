import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { of, Observable } from "rxjs";
// data
import { formGroupData } from "./formGroupData";
// models
import { InputGroup } from "../../../_models/input-group.model";
// utils
import { fieldValidation } from "../../../_utils/validation/fieldValidation";

@Component({
  selector: "app-story-form",
  templateUrl: "./story-form.component.html",
  styleUrls: ["./story-form.component.css"]
})
export class StoryFormComponent implements OnInit {
  @Output() handleSubmit = new EventEmitter();
  @Output() handleCancel = new EventEmitter();
  storyForm: FormGroup;
  controlNameErrs = {
    title: null
  };
  formGroupData$: Observable<InputGroup> = null;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.storyForm = this.formBuilder.group({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("The description was not provided")
    });

    this.formGroupData$ = of(formGroupData);
  }

  // helpers
  validateErrors(controlName: string) {
    const currentControlErr = this.storyForm.get(controlName).errors;
    this.controlNameErrs[controlName] = fieldValidation(currentControlErr);
  }

  // events
  blur(controlName: string) {
    if (controlName === "title") this.validateErrors(controlName);
  }

  cancel() {
    this.handleCancel.emit();
  }

  submitForm() {
    this.handleSubmit.emit(this.storyForm.value);
  }
}
