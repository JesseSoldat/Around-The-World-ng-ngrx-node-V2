import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
// models
import { InputGroup } from "../../../_models/input-group.model";

@Component({
  selector: "app-form-group",
  templateUrl: "./form-group.component.html",
  styleUrls: ["./form-group.component.css"]
})
export class FormGroupComponent {
  @Input("formControlName") key;

  @Input() data$: Observable<InputGroup>;

  @Input() errMsg: string;
}
