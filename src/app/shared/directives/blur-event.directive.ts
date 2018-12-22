import { Directive, Output, HostListener, EventEmitter } from "@angular/core";

@Directive({
  selector: "[appBlurEvent]"
})
export class BlurEventDirective {
  @Output() appBlurEvent = new EventEmitter();

  @HostListener("focusout", ["$event.target"]) onFocusout(target) {
    this.appBlurEvent.emit(target.name);
  }
}
