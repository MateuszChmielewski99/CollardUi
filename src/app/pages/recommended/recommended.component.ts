import { Component, OnInit } from "@angular/core";
import { MovieReference } from "collard_movies_model";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user-service.service";

@Component({
  selector: "app-recommended",
  templateUrl: "./recommended.component.html",
  styleUrls: ["./recommended.component.css"],
})
export class RecommendedComponent implements OnInit {
  movies: MovieReference[] = [];
  isLoading: boolean = true;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getUserData();

      this.userService.getRecommended(user.id).subscribe(
        (response) => {
          this.movies = response;
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        }
      );

  }
}
