import { Component, OnInit } from "@angular/core";
import { MovieListingItem } from "collard_movies_model";
import { MovieService } from "src/app/services/movie.service";
import { categories } from "../../../models/Categories";

@Component({
  selector: "app-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.css"],
})
export class PageComponent implements OnInit {
  title = "CollardMovies";
  comedies: MovieListingItem[];
  horrors: MovieListingItem[];
  areComediesLoading = true;
  areHorrorsLoading = true;
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getMoviesByGenre(categories.comedy).subscribe({
      next: (s) => {
        this.comedies = s.result;
      },
      complete: () => (this.areComediesLoading = false),
    });

    this.movieService.getMoviesByGenre(categories.horror).subscribe({
      next: (s) => {
        this.horrors = s.result;
      },
      complete: () => {
        this.areHorrorsLoading = false;
      },
    });
  }
}
