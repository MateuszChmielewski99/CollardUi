import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MoviesListComponent } from "./pages/main-page/movie-list/movies-list.component";
import { HttpClientModule } from "@angular/common/http";
import { PageComponent } from "./pages/main-page/page/page.component";
import { MovieDetailsPageComponent } from "./pages/movie-details/movie-details-page/movie-details-page.component";
import { NavComponent } from "./shared/nav/nav.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MovieItemComponent } from './shared/movie-item/movie-item.component';
import { FirstLoginComponent } from './pages/first-login/first-login.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    PageComponent,
    MovieDetailsPageComponent,
    NavComponent,
    FooterComponent,
    MovieItemComponent,
    FirstLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
