import { Component, OnInit } from '@angular/core';
import { MovieService } from '../_services/movie.service';
import { Movie } from '../_models/movie.model';


@Component({
  selector: 'app-movies-filter',
  templateUrl: './movies-filter.component.html',
  styleUrls: ['./movies-filter.component.css']
})
export class MoviesFilterComponent implements OnInit {
  genreslist = ["Action", "Adventure", "Comedy", "Crime", "Documentary", "Drama", "Family",
  "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction", "TV Movie", 
  "Thriller", "War", "Western", "Animation"];
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.movieService.getMoviesByGenre("").subscribe((movies) => this.movies = movies);
  }

  searchMoviesByGenre(moviesGenre: string) {
    this.movieService.getMoviesByGenre(moviesGenre).subscribe((movies) => this.movies = movies);
  }
}
