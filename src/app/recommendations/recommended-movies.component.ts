import { Component, OnInit, ViewChild } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { RecommendationService } from '../_services/recommendations.service';
import { Movie } from '../_models/movie.model';

@Component({
  selector: 'recommended-movies-component',
  templateUrl: './recommended-movies.component.html',
  styleUrls: ['./recommended-movies.component.scss']
})
export class RecommendedMoviesComponent implements OnInit {
  recommendedMovies: Movie[] = [];

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit(): void {
    this.recommendationService.getRecommendedMovies().subscribe((movies) => {
      this.recommendedMovies = movies;
    });
  }
}
