import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-friend-btn-group",
  templateUrl: "./friend-btn-group.component.html",
  styleUrls: ["./friend-btn-group.component.css"]
})
export class FriendBtnGroupComponent {
  @Output()
  friendRequest: EventEmitter<void> = new EventEmitter();
  @Output()
  logout: EventEmitter<void> = new EventEmitter();
  @Input()
  requestLength: number;

  onFriendRequest(): void {
    this.friendRequest.emit();
  }

  onLogout(): void {
    this.logout.emit();
  }
}
