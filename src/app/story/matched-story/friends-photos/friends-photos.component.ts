import { Component, Input, Output, EventEmitter } from "@angular/core";
// models
import { Story } from "../../../_models/story.model";

@Component({
  selector: "app-friends-photos",
  templateUrl: "./friends-photos.component.html",
  styleUrls: ["./friends-photos.component.css"]
})
export class FriendsPhotosComponent {
  @Input() story: Story;
  @Input() status: string;
  @Output()
  sendFriendRequest = new EventEmitter<void>();
  @Output() acceptFriendRequest = new EventEmitter<void>();
  @Output()
  viewImage = new EventEmitter<string>();

  // events
  onSendFriendRequest(): void {
    this.sendFriendRequest.emit();
  }

  onAcceptFriendRequest(): void {
    this.acceptFriendRequest.emit();
  }

  // modal detail view
  onViewImage(url: string): void {
    this.viewImage.emit(url);
  }
}
