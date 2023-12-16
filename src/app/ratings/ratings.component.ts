import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from '../_services/movie.service';

@Component({
  selector: 'mat-star-rating',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RatingsComponent implements OnInit {
  @Input() movieId!: number; // Use movieId instead of selectedMovie
  @Input() rating: number = 3;
  @Input() starCount: number = 5;
  @Input() color: string = 'accent';
  @Output() ratingUpdated = new EventEmitter();

  snackBarDuration: number = 2000;
  ratingArr: number[] = [];

  constructor(private snackBar: MatSnackBar, private movieService: MovieService) {}

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }

    this.movieService.getRateForMovie(this.movieId).subscribe(
      (movieRating: number) => {
        this.rating = movieRating;
      },
      error => {
        console.error('Error getting movie rating:', error);
        this.rating = 0;
      }
    );
  }

  onMouseEnter(rating: number) {
    this.rating = rating;
  }

   onClick(rating: number) {
    this.rating = rating;
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });
    this.ratingUpdated.emit(rating);
    this.submitRating(rating);
    return false;
  }

  showIcon(index: number): string {
    return this.rating >= index + 1 ? 'assets/star_gold.png' : 'assets/star_grey.png';
  }

  submitRating(rating: number) {
    this.movieService.submitRating(this.movieId, rating).subscribe(
      () => {
        console.log('Rating submitted successfully');
      },
      error => {
        console.error('Error submitting rating:', error);
      }
    );
  }
}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
