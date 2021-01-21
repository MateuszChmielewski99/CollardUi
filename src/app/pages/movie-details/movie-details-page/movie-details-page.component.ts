import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  AddCommentRequest,
  MovieContract,
  UpdateUserFavouriteMovieRequest,
  Comment,
  RemoveCommentRequest,
} from "collard_movies_model";
import { UserReference } from "src/app/models/UserReference";
import { AuthService } from "src/app/services/auth.service";
import { CommentService } from "src/app/services/comment.service";
import { MovieService } from "src/app/services/movie.service";
import { UserService } from "src/app/services/user-service.service";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: "app-movie-details-page",
  templateUrl: "./movie-details-page.component.html",
  styleUrls: ["./movie-details-page.component.css"],
  preserveWhitespaces: true,
})
export class MovieDetailsPageComponent implements OnInit {
  movieId: string;
  movie: MovieContract;
  comments: Comment[] = [];
  isFavouriteMovie: boolean = false;
  user: UserReference | null = this.authService.getUserData();
  constructor(
    private router: ActivatedRoute,
    private movieService: MovieService,
    private authService: AuthService,
    private userService: UserService,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      this.movieId = params.get("id");
    });
    this.movieService.getById(this.movieId).subscribe((movie) => {
      this.movie = movie;
      this.comments = movie.comments ? movie.comments : [];
    });

    this.authService.getUser().subscribe((user) => {
      this.user = user;
      console.log(user,'user');
      this.userService
        .checkIfIsFavourite(this.movieId, user.id)
        .subscribe((response) => {
          this.isFavouriteMovie = response.result;
        });
    });
  }

  startOnClickHandler() {
    const request: UpdateUserFavouriteMovieRequest = {
      id: this.user.id,
      movie: {
        id: this.movie.id,
        poster: this.movie.poster,
        title: this.movie.title,
      },
    };
    if (this.isFavouriteMovie) {
      this.userService.removeMovieToFavourites(request).subscribe();
    } else {
      this.userService.addMovieToFavourites(request).subscribe();
    }

    this.isFavouriteMovie = !this.isFavouriteMovie;
  }

  commentRemoveHandler(commentId: string) {
    const request: RemoveCommentRequest = {
      commentId,
      movieId: this.movieId,
    };

    this.commentService.removeComment(request).subscribe(() => {
      this.comments = this.comments.filter((s) => s.id !== commentId);
    });
  }

  commentAddHandler(commentBody: string) {
    const comment: Comment = {
      body: commentBody,
      creationDate: new Date().toDateString(),
      id: uuidv4(),
      author: this.user,
    };

    const request: AddCommentRequest = {
      movieId: this.movieId,
      comment: comment,
    };

    this.commentService.addComment(request).subscribe(() => {
      console.log("powinno dodać");
      this.comments.push(comment);
    });
  }
}
