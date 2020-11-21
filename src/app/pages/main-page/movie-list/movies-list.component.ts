import { Component, OnInit, Input } from "@angular/core";
import { MovieListingItem } from "collard_movies_model";

@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.css"],
})
export class MoviesListComponent implements OnInit {
  @Input() movies: MovieListingItem[];
  @Input() title: string;
  @Input() isLoading: boolean;

  constructor() {}

  ngOnInit() {}
}
