import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../_services/movie.service';
import { Movie } from '../_models/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  selectedMovie!: Movie;
  userRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    // Retrieve the movie ID from the route parameters
    const movieId = this.route.snapshot.paramMap.get('id');

    // Fetch the movie details using the movie ID
    if (movieId) {
      this.movieService.getMovie(movieId).subscribe(
        (data: Movie) => {
          this.selectedMovie = data;
        },
        (error) => {
          console.error('Error fetching movie details:', error);
        }
      );
    }
  }


  onRatingUpdated(rating: number) {
    this.userRating = rating;
  }
}
