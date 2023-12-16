import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { MovieTileComponent } from './movie-tile/movie-tile.component';
import { ReactiveFormsModule } from '@angular/forms';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { MoviesComponent } from './movies/movies.component';
import { MoviesFilterComponent } from './movies-filter/movies-filter.component';
import { MovieSliderComponent } from './movie-slider/movie-slider.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { RatingModule } from 'primeng/rating';
import { RatingsComponent } from './ratings/ratings.component';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RatingDialogComponent } from './rating-dialog/rating-dialog.component'
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardUserComponent,
    MovieTileComponent,
    MoviesComponent,
    MoviesFilterComponent,
    MovieSliderComponent,
    MovieDetailsComponent,
    RatingsComponent,
    RatingDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    ReactiveFormsModule,
    CommonModule,
    RatingModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
