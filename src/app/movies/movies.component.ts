import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../_services/movie.service';
import { Movie } from '../_models/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  searchStr: string = '';

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchStr = encodeURIComponent(params['query'] || '');
      this.searchMovies();
    });
  }

  searchMovies() {
    this.movieService.searchMovies(this.searchStr).subscribe((movies) => {
      this.movies = movies;
    });
  }
}
