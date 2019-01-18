import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isAuth$: Observable<boolean>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isAuth$ = of(false);
  }
}