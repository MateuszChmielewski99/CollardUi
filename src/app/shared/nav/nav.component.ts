import { Component, OnInit } from "@angular/core";
import { inject } from "@angular/core/testing";
import { AuthServiceService } from "src/app/services/auth-service.service";
import { UserService } from "src/app/services/user-service.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  constructor(
    private authService: AuthServiceService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  signInUser() {
    this.authService.signIn().then((s) => {
      this.authService.user$.subscribe((user) => {
        if (user) {
          this.userService.signIn(user).subscribe((res) => {
            if ((res as any).created) {
              console.log("Firs time");
            }
          });
        }
      });
    });
  }
}
