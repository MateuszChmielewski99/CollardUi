import { Component, Input, OnInit } from '@angular/core';
import { MovieReference } from 'collard_movies_model';

@Component({
  selector: 'movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movie: MovieReference;
  constructor() { }

  ngOnInit() {
  }

}
