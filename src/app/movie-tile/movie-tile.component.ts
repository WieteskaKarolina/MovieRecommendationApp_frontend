import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../_models/movie.model';


@Component({
  selector: 'app-movie-tile',
  templateUrl: './movie-tile.component.html',
  styleUrls: ['./movie-tile.component.scss']
})
export class MovieTileComponent implements OnInit {
  @Input()
  movie!: Movie;

  constructor(
    private router: Router, 
  ) {}

  ngOnInit(): void {}

 
  onTileClick() {
    this.router.navigate(['/movie-details', this.movie?.movie_id]);
  }  
}
