import { Component, OnInit, ViewChild } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { MovieService } from '../_services/movie.service';
import { Movie } from '../_models/movie.model';

@Component({
  selector: 'watch-later-movies-component',
  templateUrl: './watch-later-movies.component.html',
  styleUrls: ['./watch-later-movies.component.scss']
})
export class WatchLaterMoviesComponent implements OnInit {
  watchLaterMovies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getWatchLaterList().subscribe((movies) => {
      this.watchLaterMovies = movies;
    });
  }
}
