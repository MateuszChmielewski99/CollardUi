import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { MovieContract, MovieListingResponse } from "collard_movies_model";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class MovieService {
  private url: string = `${environment.apiBaseUrl}/movie`;
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

  getById(id: string): Observable<MovieContract> {
    return this.client.get<any>(`${this.url}?id=${id}`);
  }

  getHigerRated(limit: number = 50) {
    const requestUrl = `${this.url}/top`;
    const queryParams: HttpParams = new HttpParams().set(
      "limit",
      limit.toString()
    );

    return this.client.get<MovieContract[]>(requestUrl, {
      params: queryParams,
    });
  }

  getNewest(limit: number = 10){
    const requestUrl = `${this.url}/newest`;
    const queryParams: HttpParams = new HttpParams().set(
      "limit",
      limit.toString()
    );

    return this.client.get<MovieContract[]>(requestUrl, {
      params: queryParams,
    });
  }
}
