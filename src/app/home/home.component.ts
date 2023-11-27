import { MovieService } from '../_services/movie.service';
import { Movie } from '../_models/movie.model';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-your-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];

  carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    items: 5, // Display 5 items at once
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  };
  
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }

}
