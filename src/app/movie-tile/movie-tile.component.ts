import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../_models/movie.model';
import { Router } from '@angular/router';

// import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons';
// import { faHeart as faNotFav, faEye as faNotWatched } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-movie-tile',
  templateUrl: './movie-tile.component.html',
  styleUrls: ['./movie-tile.component.scss']
})
export class MovieTileComponent implements OnInit {
  @Input() movie: Movie | undefined;


  constructor(private router: Router) {}
  
  ngOnInit(): void {}

  // ngOnChange(): void {
  //   console.log('Change', this.isFav)
  // }

  // onFavClick(): void {
  //   this.favClick.emit();
  // }

  // onWatchedClick(): void {
  //   this.watchedClick.emit();
  // }

  onTileClick() {
    this.router.navigate(['/movie-details', this.movie?.api_id]);
  }

}
