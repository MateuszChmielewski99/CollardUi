import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  IsUserFavouriteMovieResponse,
  UpdateUser,
  UpdateUserFavouriteMovieRequest,
} from "collard_movies_model";
import { MovieReference } from "collard_movies_model";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl: string = `${environment.apiBaseUrl}/user`;
  constructor(private httpClient: HttpClient) {}

  signIn(userId: string) {
    const requestUrl = `${this.baseUrl}/sign_in`;
    const body = {
      id: userId,
    };

    return this.httpClient.post(requestUrl, body);
  }

  updateUser(request: UpdateUser) {
    const requestUrl = `${this.baseUrl}/favourites/add`;
    return this.httpClient.put(requestUrl, request);
  }

  getUserFavourites(id: string) {
    const requestUrl = `${this.baseUrl}/favourites`;

    const queryParams: HttpParams = new HttpParams().set("id", id);

    return this.httpClient.get<MovieReference[]>(requestUrl, {
      params: queryParams,
    });
  }

  addMovieToFavourites(request: UpdateUserFavouriteMovieRequest) {
    const requestUrl = `${this.baseUrl}/favourites`;

    return this.httpClient.put(requestUrl, request);
  }

  removeMovieToFavourites(request: UpdateUserFavouriteMovieRequest) {
    const requestUrl = `${this.baseUrl}/favourites/remove`;

    return this.httpClient.put(requestUrl, request);
  }

  getRecommended(id:string){
    const requestUrl = `${this.baseUrl}/recommended`;

    const queryParams: HttpParams = new HttpParams().set("id", id);

    return this.httpClient.get<MovieReference[]>(requestUrl, {
      params: queryParams,
    });
  }

  checkIfIsFavourite(
    movieId: string,
    userId: string
  ): Observable<IsUserFavouriteMovieResponse> {
    const queryParams: HttpParams = new HttpParams()
      .set("userId", userId)
      .set("movieId", movieId);
    const requestUrl = `${this.baseUrl}/favourites/check`;

    return this.httpClient.get<IsUserFavouriteMovieResponse>(requestUrl, {
      params: queryParams,
    });
  }
}
