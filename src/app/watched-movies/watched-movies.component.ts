import { Component, OnInit, ViewChild } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { MovieService } from '../_services/movie.service';
import { Movie } from '../_models/movie.model';

@Component({
  selector: 'watched-movies-component',
  templateUrl: './watched-movies.component.html',
  styleUrls: ['./watched-movies.component.scss']
})
export class WachedMoviesComponent implements OnInit {
  watchedMovies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getWatchedMovies().subscribe((movies) => {
      this.watchedMovies = movies;
    });
  }
}
