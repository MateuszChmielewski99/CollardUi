import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { RecommendMoviesRequest } from "../models/RecommendRequest";

@Injectable({
  providedIn: "root",
})
export class RecommendService {
  private url: string = `${environment.apiBaseUrl}/recommend`;
  constructor(private client: HttpClient) {}

  recommend(request: RecommendMoviesRequest) {
    return this.client.post(this.url, request);
  }
}
