import { Component, OnInit, ViewChild } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { MovieService } from '../_services/movie.service';
import { Movie } from '../_models/movie.model';

@Component({
  selector: 'app-your-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  visibleMovies: Movie[] = [];
  currentIndex = 0;

  @ViewChild('carousel') carousel!: Carousel;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
      this.updateVisibleMovies();
    });
  }

  updateVisibleMovies(): void {
    this.visibleMovies = this.movies.slice(this.currentIndex, this.currentIndex + 5);
  }

  scrollCarousel(direction: 'left' | 'right'): void {
    const increment = direction === 'left' ? -5 : 5;
    this.currentIndex = (this.currentIndex + increment + this.movies.length) % this.movies.length;
    this.updateVisibleMovies();
  }
}
