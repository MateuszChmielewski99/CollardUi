import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  private readonly userSource = new BehaviorSubject<string | null>(
    null
  );
  readonly user$ = this.userSource.asObservable();
  private authInstance: gapi.auth2.GoogleAuth;
  private gapiSetup: boolean;

  constructor() {}

  private async initGoogleAuth(): Promise<void> {
    const pload = new Promise((resolve) => {
      gapi.load("auth2", resolve);
    });

    return pload.then(async () => {
      await gapi.auth2.init({ client_id: "528275963054-l2vb32skb0qukmo6e7i4pu3hjme9ofma.apps.googleusercontent.com" }).then((auth) => {
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
    this.userSource.next(user.getId());
  }

  async signOut(): Promise<void> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    this.userSource.next(null);
    await this.authInstance.signOut();
  }

  getUser() {
    this.userSource.getValue();
  }
}
