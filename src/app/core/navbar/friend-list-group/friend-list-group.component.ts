import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-friend-list-group",
  templateUrl: "./friend-list-group.component.html",
  styleUrls: ["./friend-list-group.component.css"]
})
export class FriendListGroupComponent {
  @Input() requestLength: number;
  @Output() logout: EventEmitter<void> = new EventEmitter();
  @Output() friendRequest: EventEmitter<void> = new EventEmitter();

  onFriendRequest(): void {
    this.friendRequest.emit();
  }

  onLogout(): void {
    this.logout.emit();
  }
}
