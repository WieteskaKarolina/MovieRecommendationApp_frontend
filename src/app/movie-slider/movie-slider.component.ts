import { Component, OnInit } from '@angular/core';
import { MovieService } from '../_services/movie.service';
import { Movie } from '../_models/movie.model';

@Component({
  selector: 'app-movie-slider',
  templateUrl: './movie-slider.component.html',
  styleUrls: ['./movie-slider.component.scss'],
})
export class MovieSliderComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    // Fetch movies from your service
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }
}