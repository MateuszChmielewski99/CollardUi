import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MovieDetailsPageComponent } from "./pages/movie-details/movie-details-page/movie-details-page.component";
import { PageComponent } from "./pages/main-page/page/page.component";
import { FirstLoginComponent } from "./pages/first-login/first-login.component";

const routes: Routes = [
  { path: "first_login", component: FirstLoginComponent },
  { path: "movie/:id", component: MovieDetailsPageComponent },
  { path: "", component: PageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
