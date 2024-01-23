import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carousel } from 'primeng/carousel';
import { MovieService } from '../_services/movie.service';
import { Movie } from '../_models/movie.model';
import { MatDialog } from '@angular/material/dialog';
import { RatingDialogComponent } from '../rating-dialog/rating-dialog.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  selectedMovie!: Movie;
  userRating: number = 0;
  watched: boolean = false;
  watchLater: boolean = false;
  recommendedMovies: Movie[] = [];
  recommendedVisibleMovies: Movie[] = [];
  recommendedCurrentIndex = 0;
  similarMovies: Movie[] = [];
  similarVisibleMovies: Movie[] = [];
  similarCurrentIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    public dialog: MatDialog
  ) {}

  @ViewChild('carousel') carousel!: Carousel;

  
  ngOnInit() {
    // Retrieve the movie ID from the route parameters
    const movieId = this.route.snapshot.paramMap.get('id');
  
    if (movieId) {
      this.movieService.getMovie(movieId).subscribe(
        (data: Movie) => {
          this.selectedMovie = data;
        },
        (error) => {
          console.error('Error fetching movie details:', error);
        }
      );
  
      const numericMovieId = parseInt(movieId, 10);
      this.watched = this.movieService.isMovieInWatchedList(numericMovieId);
    }

    this.movieService.getRecommendedMovies(movieId as string).subscribe((movies) => {
      this.recommendedMovies = movies;
      this.updateRecommendedVisibleMovies();
    });

    this.movieService.getSimilarMovies(movieId as string).subscribe((movies) => {
      this.similarMovies = movies;
      this.updateSimilarVisibleMovies();
    });

    this.movieService.getWatchedMovies();
  }
  


  clickOnWatched(): void {
    if (this.watched) {
      this.movieService.deleteMovieFromWatched(this.selectedMovie.movie_id).subscribe(() => {
        this.watched = false;
      });
    } else {
      this.movieService.addMovieToWatched(this.selectedMovie.movie_id).subscribe(() => {
        this.watched = true;
      });
    }
    this.movieService.getWatchedMovies();
  }

  clickOnWatchLater(): void {
    if (this.watchLater) {
      this.movieService.removeMovieFromWatchLater(this.selectedMovie.movie_id).subscribe(() => {
        this.watchLater = false;
      });
    } else {
      this.movieService.addMovieToWatchLater(this.selectedMovie.movie_id).subscribe(() => {
        this.watchLater = true;
      });
    }
    this.movieService.getWatchLaterList();
  }

  openRatingDialog() {
    const dialogRef = this.dialog.open(RatingDialogComponent, {
      width: '400px',
      data: {
        movieId: this.selectedMovie.movie_id,
        userRating: this.userRating,
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.userRating = result;
      }
    });
  }


  updateRecommendedVisibleMovies(): void {
    this.recommendedVisibleMovies = this.recommendedMovies.slice(this.recommendedCurrentIndex, this.recommendedCurrentIndex + 5);
  }

  scrollRecommendedCarousel(direction: 'left' | 'right'): void {
    const increment = direction === 'left' ? -5 : 5;
    this.recommendedCurrentIndex = (this.recommendedCurrentIndex + increment + this.recommendedMovies.length) % this.recommendedMovies.length;
    this.updateRecommendedVisibleMovies();
  }
    
  updateSimilarVisibleMovies(): void {
    this.similarVisibleMovies = this.similarMovies.slice(this.similarCurrentIndex, this.similarCurrentIndex + 5);
  }

  scrollSimilarCarousel(direction: 'left' | 'right'): void {
    const increment = direction === 'left' ? -5 : 5;
    this.similarCurrentIndex = (this.similarCurrentIndex + increment + this.similarMovies.length) % this.similarMovies.length;
    this.updateSimilarVisibleMovies();
  }
}
