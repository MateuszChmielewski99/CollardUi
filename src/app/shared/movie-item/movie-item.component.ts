import { Component, Input, OnInit } from "@angular/core";
import { MovieReference } from "collard_movies_model";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "movie-item",
  templateUrl: "./movie-item.component.html",
  styleUrls: ["./movie-item.component.css"],
})
export class MovieItemComponent implements OnInit {
  @Input() movie: MovieReference;
  constructor() {}
  private hasError: boolean = false;
  color;

  hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  intToRGB(i) {
    var c = (i & 0x00ffffff).toString(16).toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
  }

  ngOnInit() {}

  onError() {
    if (this.movie) this.color = this.intToRGB(this.hashCode(this.movie.title));
    this.hasError = true;
  }
}
