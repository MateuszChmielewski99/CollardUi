import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { MovieListingResponse } from "collard_movies_model";
@Injectable({
  providedIn: "root",
})
export class MovieService {
  private url: string = "http://localhost:7000/api/movie";
  constructor(private client: HttpClient) {}

  getMoviesByGenre(
    genre: string,
    limit: number = 8
  ): Observable<MovieListingResponse> {
    const queryParams: HttpParams = new HttpParams()
      .set("genre", genre)
      .set("limit", limit.toString());

    return this.client.get<MovieListingResponse>(`${this.url}/listing`, {
      params: queryParams,
    });
  }

  getById(id: string): Observable<any> {
    return this.client.get<any>(`${this.url}?id=${id}`);
  }
}
