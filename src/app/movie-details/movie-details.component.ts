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
  seeAlsoMovies: Movie[] = [];
  visibleMovies: Movie[] = [];
  currentIndex = 0;


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

    this.movieService.getMovies().subscribe((movies) => {
      this.seeAlsoMovies = movies;
      this.updateVisibleMovies();
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


  updateVisibleMovies(): void {
    this.visibleMovies = this.seeAlsoMovies.slice(this.currentIndex, this.currentIndex + 5);
  }

  scrollCarousel(direction: 'left' | 'right'): void {
    const increment = direction === 'left' ? -5 : 5;
    this.currentIndex = (this.currentIndex + increment + this.seeAlsoMovies.length) % this.seeAlsoMovies.length;
    this.updateVisibleMovies();
  }
    
}
