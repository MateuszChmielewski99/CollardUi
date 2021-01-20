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
import { ScrollingModule } from "@angular/cdk/scrolling";
import { MovieItemComponent } from "./shared/movie-item/movie-item.component";
import { FirstLoginComponent } from "./pages/first-login/first-login.component";
import { FavouritesComponent } from "./pages/favourites/favourites.component";
import { AuthService } from "./services/auth.service";
import { StartButtonComponent } from "./pages/movie-details/start-button/start-button.component";
import { CommentsComponent } from "./pages/movie-details/comments/comments.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SettingsComponent } from "./pages/settings/settings.component";
import { RecommendedComponent } from './pages/recommended/recommended.component';
import { GenresComponent } from './pages/genres/genres.component';
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    MoviesListComponent,
    PageComponent,
    MovieDetailsPageComponent,
    NavComponent,
    FooterComponent,
    MovieItemComponent,
    FirstLoginComponent,
    FavouritesComponent,
    StartButtonComponent,
    CommentsComponent,
    SettingsComponent,
    RecommendedComponent,
    GenresComponent,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
