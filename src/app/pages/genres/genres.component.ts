import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieReference } from "collard_movies_model/dist/models/types/generated/User";
import { MovieService } from "src/app/services/movie.service";

@Component({
  selector: "app-genres",
  templateUrl: "./genres.component.html",
  styleUrls: ["./genres.component.css"],
})
export class GenresComponent implements OnInit {
  type: string = "";
  isLoading: boolean = false;
  pageSize = 15;
  pageNumber = 1;
  totalCount = 0;
  movies: MovieReference[] = [];
  constructor(
    private router: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.router.params.subscribe((params) => {
      const genre = this.capitalizeFLetter(params.type); 
      this.type = genre;
      this.fetchMovies(genre, this.pageNumber)
    });
  }

  fetchMovies(genre: string, pageNumber: number) {
    this.isLoading = true;
    this.movieService
      .getMoviesByGenre(genre, Number(this.pageSize), pageNumber)
      .subscribe(
        (response) => {
          this.totalCount = response.count;
          this.movies = response.result;
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        },
      );
  }

  capitalizeFLetter(type: string) {
    return type[0].toUpperCase() + type.slice(1);
  }

  onPageChange(pageNumber: string) {
    const pageNumb = Number(pageNumber);
    this.pageNumber = pageNumb;
    this.fetchMovies(this.type, pageNumb);
  }
}
