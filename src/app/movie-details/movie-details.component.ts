import { Component, Input } from '@angular/core';
import { Movie } from '../_models/movie.model';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  @Input() selectedMovie: Movie | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
