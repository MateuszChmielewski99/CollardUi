import { Component, OnInit } from "@angular/core";
import { inject } from "@angular/core/testing";
import { Router } from '@angular/router';
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user-service.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router:Router
  ) {}

  ngOnInit() {
  }

  signInUser() {
    this.authService.signIn().then(() => {
      this.authService.getUser().subscribe((user) => {
        if (user) {
          this.userService.signIn(user.id).subscribe((res) => {
            if ((res as any).created) {
              this.router.navigateByUrl('/first_login')
            }
          });
        }
      });
    });
  }
}
