import { Component, Input, Output, EventEmitter } from "@angular/core";
// models
import { UserStoryIds } from "../../../_models/user-story-ids.model";
import { Story } from "../../../_models/story.model";

@Component({
  selector: "app-img-card",
  templateUrl: "./img-card.component.html",
  styleUrls: ["./img-card.component.css"]
})
export class ImgCardComponent {
  @Output() onBtnClick: EventEmitter<UserStoryIds> = new EventEmitter();
  @Input() data: Story;

  btnClick(data: Story) {
    this.onBtnClick.emit({
      userId: data.user._id,
      storyId: data._id
    });
  }
}
