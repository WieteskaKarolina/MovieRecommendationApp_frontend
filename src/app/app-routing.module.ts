import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesFilterComponent } from './movies-filter/movies-filter.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { WachedMoviesComponent } from './watched-movies/watched-movies.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'moviesSearch', component: MoviesComponent},
  { path: 'moviesFilter', component: MoviesFilterComponent},
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  { path: 'watched', component: WachedMoviesComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
