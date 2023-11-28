import { MovieService } from '../_services/movie.service';
import { Movie } from '../_models/movie.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-your-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }

}
