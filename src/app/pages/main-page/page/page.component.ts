import { Component, OnInit } from "@angular/core";
import { MovieListingItem } from "collard_movies_model";
import { MovieService } from "src/app/services/movie.service";
import { Genres } from "../../../models/Categories";

@Component({
  selector: "app-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.css"],
})
export class PageComponent implements OnInit {
  title = "CollardMovies";
  newest: MovieListingItem[];
  topRated: MovieListingItem[];
  areNewestLoading = true;
  areTopRatedLoading = true;
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getNewest(8).subscribe({
      next: (s) => {
        this.newest = s;
      },
      complete: () => (this.areNewestLoading = false),
    });

    this.movieService.getHigerRated(15).subscribe({
      next: (s) => {
        this.topRated = s;
      },
      complete: () => {
        this.areTopRatedLoading = false;
      },
    });
  }
}
