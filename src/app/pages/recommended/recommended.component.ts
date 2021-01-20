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
    
      
      if (this.movies.length) {
        this.isLoading = false;
        return;
      }

      this.userService.getRecommended('109938027001218246375').subscribe(
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
