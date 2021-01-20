import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-genres",
  templateUrl: "./genres.component.html",
  styleUrls: ["./genres.component.css"],
})
export class GenresComponent implements OnInit {
  type: string = "";
  isLoading:boolean = false;
  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.type = this.capitalizeFLetter(params.type);
    });
  }

  capitalizeFLetter(type: string) {
    return type[0].toUpperCase() + type.slice(1);
  }
}
