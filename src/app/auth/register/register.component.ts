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
// utils
import { fieldValidation } from "../../_utils/validation/fieldValidation";
// models
import { InputGroup } from "../../_models/input-group.model";
import { Auth } from "../../_models/auth.model";
import { HttpRes } from "../../_models/http-res.model";
// data
import { formGroupData } from "../formGroupData";
// services
import { AuthService } from "../../_services/auth.service";

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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.formGroupData$ = of(formGroupData);
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      username: new FormControl("test", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      passwordGroup: this.formBuilder.group(
        {
          password: [
            "123456",
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(15)
            ]
          ],
          confirmPassword: ["123456", [Validators.required]]
        },
        {
          validator: confirmPasswordValidator
        }
      )
    });
  }

  handleControlErrs(controlName: string) {
    const currentControlErr = this.registerForm.get(controlName).errors;

    this.controlNameErrs[controlName] = fieldValidation(currentControlErr);
  }

  handleGroupErrs(controlName: string) {
    const group = this.registerForm.get("passwordGroup");

    // group errors
    if (controlName === "confirmPassword") {
      return (this.controlNameErrs[controlName] = fieldValidation(
        group.errors
      ));
    }

    // single control errors
    const control = group.get(controlName).errors;
    this.controlNameErrs[controlName] = fieldValidation(control);
  }

  handleBlurEvent(controlName: string) {
    if (controlName === "password" || controlName === "confirmPassword") {
      return this.handleGroupErrs(controlName);
    }

    this.handleControlErrs(controlName);
  }

  handleSubmit() {
    const values = this.registerForm.value;
    const { password } = values.passwordGroup;

    const auth: Auth = {
      username: values.username,
      email: values.email,
      password
    };

    this.authService
      .registerByEmail(auth)
      .subscribe((res: HttpRes) => {}, err => {});
  }
}
