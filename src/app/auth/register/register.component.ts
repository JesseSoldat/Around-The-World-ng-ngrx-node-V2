import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Observable, of } from "rxjs";

// validators
import { confirmPasswordValidator } from "../helpers/confirmPasswordValidator";
// models
import { formGroupData } from "../formGroupData";
// data
import { InputGroup } from "src/app/_models/input-group.model";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  // input field data
  formGroupData$: Observable<InputGroup> = null;
  //form
  registerForm: FormGroup;
  controlNameErrs = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formGroupData$ = of(formGroupData);
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      passwordGroup: this.formBuilder.group(
        {
          password: [
            "",
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(15)
            ]
          ],
          confirmPassword: ["", [Validators.required]]
        },
        {
          validator: confirmPasswordValidator
        }
      )
    });
  }
}
