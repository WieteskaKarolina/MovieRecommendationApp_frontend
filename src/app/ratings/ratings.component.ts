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
  }

  onClick(rating: number) {
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });
    this.ratingUpdated.emit(rating);
    this.submitRating(rating);
    return false;
  }

  showIcon(index: number) {
    return this.rating >= index + 1 ? 'star' : 'star_border';
  }

  submitRating(rating: number) {
    this.movieService.submitRating(this.movieId, rating).subscribe(
      () => {
        console.log('Rating submitted successfully');
        // You can update UI or perform any other action upon successful submission
      },
      error => {
        console.error('Error submitting rating:', error);
        // Handle error as needed
      }
    );
  }
}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}