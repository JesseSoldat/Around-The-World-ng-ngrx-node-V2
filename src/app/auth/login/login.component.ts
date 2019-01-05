import { Component, OnInit } from "@angular/core";
import { of, Observable } from "rxjs";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

// models
import { Auth } from "../../_models/auth.model";
import { InputGroup } from "../../_models/input-group.model";
import { HttpRes } from "../../_models/http-res.model";
// data
import { formGroupData } from "../formGroupData";
// services
import { AuthService } from "src/app/_services/auth.service";
// utils
import { fieldValidation } from "src/app/_utils/validation/fieldValidation";

interface errorMap {
  [key: string]: boolean;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  formGroupData$: Observable<InputGroup> = null;
  loginForm: FormGroup;
  controlNameErrs = {
    email: null,
    password: null
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
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    });
  }

  // helpers
  createErrMsg(controlName: string, currentControlErr: errorMap) {
    this.controlNameErrs[controlName] = fieldValidation(currentControlErr);
  }

  // events
  blurEvent(controlName: string) {
    const currentControlErr = this.loginForm.get(controlName).errors;
    this.createErrMsg(controlName, currentControlErr);
  }

  handleSubmit() {
    const formValues = this.loginForm.value;
    const auth: Auth = {
      email: formValues.email,
      password: formValues.password
    };

    this.authService.loginByEmail(auth).subscribe(
      (res: HttpRes) => {
        console.log("Login Res:", res);
      },
      err => {
        console.log("Login Err:", err);
      }
    );
  }
}
