import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { MovieService } from '../_services/movie.service';
import { Movie } from '../_models/movie.model';

@Component({
  selector: 'app-slider',
  templateUrl: './movie-slider.component.html',
  styleUrls: ['./movie-slider.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('500ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('500ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class MovieSliderComponent implements OnInit {
  current = 0;
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    // Fetch movies from your service
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
    });
    this.sliderTimer();
  }

  sliderTimer() {
    setInterval(() => {
      this.current = ++this.current % this.movies.length;
    }, 15000);
  }

}
