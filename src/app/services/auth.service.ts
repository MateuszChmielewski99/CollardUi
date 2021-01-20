import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserReference } from "../models/UserReference";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly userSource = new BehaviorSubject<UserReference | null>(null);
  private readonly isLoading = new BehaviorSubject<boolean>(true);
  private authInstance: gapi.auth2.GoogleAuth;
  private gapiSetup: boolean;

  constructor() {
    this.initGoogleAuth();
  }

  private async initGoogleAuth(): Promise<void> {
    const pload = new Promise((resolve) => {
      gapi.load("auth2", resolve);
    });

    return pload.then(async () => {
      await gapi.auth2
        .init({
          client_id:
            "528275963054-l2vb32skb0qukmo6e7i4pu3hjme9ofma.apps.googleusercontent.com",
          cookie_policy: "http://localhost:4200",
        })
        .then((auth) => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  async signIn(): Promise<void> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    const user = await this.authInstance.signIn();

    const userReference: UserReference = {
      id: user.getId(),
      name: user.getBasicProfile().getName(),
    };
    this.userSource.next(userReference);
  }

  async getInitUser() {
    const isLoggedIn = await this.authInstance.isSignedIn;
    if (!isLoggedIn) {
      this.isLoading.next(false);
      return;
    }

    const currentUser = await this.authInstance.currentUser;

    this.userSource.next({
      id: currentUser.get().getId(),
      name: currentUser.get().getBasicProfile().getName(),
    });

    this.isLoading.next(false);
  }

  async signOut(): Promise<void> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    this.userSource.next(null);
    await this.authInstance.signOut();
  }

  getUserData() {
    return this.userSource.getValue();
  }

  getUser() {
    return this.userSource.asObservable();
  }

  getIsLoading() {
    this.getInitUser();
    return this.isLoading.asObservable();
  }
}
