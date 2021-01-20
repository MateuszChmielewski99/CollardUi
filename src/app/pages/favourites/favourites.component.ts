import { Component, OnInit } from "@angular/core";
import { MovieReference } from "collard_movies_model/dist/models/types/generated/User";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user-service.service";

@Component({
  selector: "app-favourites",
  templateUrl: "./favourites.component.html",
  styleUrls: ["./favourites.component.css"],
})
export class FavouritesComponent implements OnInit {
  movies: MovieReference[] = [];
  isLoading: boolean = true;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
        if (!user) return;

        if(this.movies.length){
          this.isLoading = false;
          return;
        }

        this.userService.getUserFavourites(user.id).subscribe(
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
      });
  }
}
