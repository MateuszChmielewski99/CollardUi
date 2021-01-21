import { Component, Input, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { MovieReference, UpdateUser } from "collard_movies_model";
import { AuthService } from "src/app/services/auth.service";
import { MovieService } from "src/app/services/movie.service";
import { UserService } from "src/app/services/user-service.service";
@Component({
  selector: "app-first-overlay",
  templateUrl: "./first-login.component.html",
  styleUrls: ["./first-login.component.css"],
})
export class FirstLoginComponent implements OnInit {
  page: any;
  movieList: MovieReference[];
  userMovies: MovieReference[] = [];
  isLoading: boolean = true;
  userId:string;
  @Input() hidden: boolean;

  constructor(
    private movieService: MovieService,
    private authService: AuthService,
    private userService: UserService,
    private router:Router
  ) {}

  ngOnInit() {
    this.movieService.getHigerRated(70).subscribe(
      (resp) => {
        this.movieList = resp;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  onImageError(event) {
    event.target.style.display = "none"
    event.target.nextElementSibling.style.display = "flex";
  }

  addUserMovie(event, movie: MovieReference) {
    const index = this.userMovies.indexOf(movie);
    if (index === -1) {
      this.setBoxShadow(event, "5px 5px 15px -1px rgb(251,91,139)");
      this.userMovies.push(movie);
    } else {
      this.setBoxShadow(event, "");
      this.removeMovie(index);
    }
  }

  private removeMovie(index: number) {
    this.userMovies.splice(index, 1);
  }

  handleSave() {
    const userId = this.authService.getUserData().id;
    if(!userId) return;
    
    const request: UpdateUser = {
      _id: userId,
      favourites: this.userMovies,
    };

    this.userService.updateUser(request).subscribe(() => {
      this.router.navigateByUrl('/')
    });
  }

  private setBoxShadow(event, value) {
    event.target.style.boxShadow = value;
  }
}
