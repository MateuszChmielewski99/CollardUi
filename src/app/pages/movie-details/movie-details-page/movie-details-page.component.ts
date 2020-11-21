import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieContract } from "collard_movies_model";
import { MovieService } from "src/app/services/movie.service";

@Component({
  selector: "app-movie-details-page",
  templateUrl: "./movie-details-page.component.html",
  styleUrls: ["./movie-details-page.component.css"],
  preserveWhitespaces: true,
})
export class MovieDetailsPageComponent implements OnInit {
  movieId: string;
  movie: MovieContract;
  constructor(
    private router: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe((s) => {
      this.movieId = s.get("id");
    });
    this.movieService.getById(this.movieId).subscribe((s) => {
      this.movie = s;
    });
  }
}
