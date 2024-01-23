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
  nowPlayingMovies: Movie[] = [];
  popularMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  visiblenowPlayingMovies: Movie[] = [];
  visiblepopularMovies: Movie[] = [];
  visibletopRatedMovies: Movie[] = [];
  visibleupcomingMovies: Movie[] = [];
  currentIndexnowPlayingMovies = 0;
  currentIndexpopularMovies = 0;
  currentIndextopRatedMovies = 0;
  currentIndexupcomingMovies = 0;


  @ViewChild('carousel') carousel!: Carousel;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getPupularMovies().subscribe((movies) => {
      this.popularMovies = movies;
      this.updateVisiblePopularMovies();
    });

    this.movieService.getNowPlayingMovies().subscribe((movies) => {
      this.nowPlayingMovies = movies;
      this.updateVisibleNowPlayingMovies();
    });


    this.movieService.getTopRatedMovies().subscribe((movies) => {
      this.topRatedMovies = movies;
      this.updateVisibleTopRatedMovies();
    });


    this.movieService.getUpcomingrMovies().subscribe((movies) => {
      this.upcomingMovies = movies;
      this.updateVisibleUpcomingMovies();
    });
    this.movieService.getWatchedMovies();
  }
////////////////////////////////////////////////////////
  updateVisiblePopularMovies(): void {
    this.visiblepopularMovies = this.popularMovies.slice(this.currentIndexpopularMovies, this.currentIndexpopularMovies + 5);
  }

  scrollPopularCarousel(direction: 'left' | 'right'): void {
    const increment = direction === 'left' ? -5 : 5;
    this.currentIndexpopularMovies = (this.currentIndexpopularMovies + increment + this.popularMovies.length) % this.popularMovies.length;
    this.updateVisiblePopularMovies();
  }
//////////////////////////////////////////////////////////
  updateVisibleTopRatedMovies(): void {
    this.visibletopRatedMovies = this.topRatedMovies.slice(this.currentIndextopRatedMovies, this.currentIndextopRatedMovies + 5);
  }

  scrollTopRatedCarousel(direction: 'left' | 'right'): void {
    const increment = direction === 'left' ? -5 : 5;
    this.currentIndextopRatedMovies = (this.currentIndextopRatedMovies + increment + this.topRatedMovies.length) % this.topRatedMovies.length;
    this.updateVisibleTopRatedMovies();
  }

/////////////////////////////////////////////////////////
  updateVisibleNowPlayingMovies(): void {
    this.visiblenowPlayingMovies= this.nowPlayingMovies.slice(this.currentIndexnowPlayingMovies, this.currentIndexnowPlayingMovies + 5);
  }

  scrollNowPlayingCarousel(direction: 'left' | 'right'): void {
    const increment = direction === 'left' ? -5 : 5;
    this.currentIndexnowPlayingMovies = (this.currentIndexnowPlayingMovies + increment + this.nowPlayingMovies.length) % this.nowPlayingMovies.length;
    this.updateVisibleNowPlayingMovies();
  }
///////////////////////////////////////////////////////////

  updateVisibleUpcomingMovies(): void {
    this.visibleupcomingMovies = this.upcomingMovies.slice(this.currentIndexupcomingMovies, this.currentIndexupcomingMovies + 5);
  }

  scrollUpcomingCarousel(direction: 'left' | 'right'): void {
    const increment = direction === 'left' ? -5 : 5;
    this.currentIndexupcomingMovies = (this.currentIndexupcomingMovies + increment + this.upcomingMovies.length) % this.upcomingMovies.length;
    this.updateVisibleUpcomingMovies();
  }
}
