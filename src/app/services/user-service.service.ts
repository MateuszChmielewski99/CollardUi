import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl:string = "http://localhost:7050/api/user";
  constructor(private httpClient:HttpClient) { }

  signIn(userId:string){
    const requestUrl = `${this.baseUrl}/sign_in`
    const body = {
      id:userId
    }

    return this.httpClient.post(requestUrl,body);
  }
}
