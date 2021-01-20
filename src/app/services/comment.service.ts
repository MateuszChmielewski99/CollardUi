import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AddCommentRequest, RemoveCommentRequest } from "collard_movies_model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  private url: string = `${environment.apiBaseUrl}/movie/comment`;
  constructor(private client: HttpClient) {}

  addComment(request: AddCommentRequest) {
    return this.client.put(this.url, request, {responseType:'text'});
  }

  removeComment(request: RemoveCommentRequest) {
    const queryParams: HttpParams = new HttpParams()
      .set("commentId", request.commentId)
      .set("movieId", request.movieId);

    return this.client.delete(this.url, {
      params: queryParams,
      responseType: "text",
    });
  }
}
