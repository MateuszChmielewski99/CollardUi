import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MovieDetailsPageComponent } from "./pages/movie-details/movie-details-page/movie-details-page.component";
import { PageComponent } from "./pages/main-page/page/page.component";
import { FirstLoginComponent } from "./pages/first-login/first-login.component";
import { FavouritesComponent } from "./pages/favourites/favourites.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { RecommendedComponent } from "./pages/recommended/recommended.component";
import { GenresComponent } from "./pages/genres/genres.component";

const routes: Routes = [
  { path: "first_login", component: FirstLoginComponent },
  { path: "movie/:id", component: MovieDetailsPageComponent },
  { path: "favourites", component: FavouritesComponent },
  { path: "", component: PageComponent },
  { path: "settings", component: SettingsComponent },
  { path: "recommended", component: RecommendedComponent },
  {path:'genre/:type', component:GenresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
