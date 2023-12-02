import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../_models/movie.model';
import { CommunicationService } from './communication.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'http://localhost:8080/api/movies';

  constructor(
    private http: HttpClient,
    private communicationService: CommunicationService
  ) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl + '/topten');
  }

  searchMovies(query: string): Observable<Movie[]> {
    const url = `${this.baseUrl}/search?query=${query}`;
    return this.http.get<Movie[]>(url);
  }

  notifySearchDone() {
    this.communicationService.triggerSearchDone();
  }

  getMoviesByGenre(query: string): Observable<Movie[]> {
    const url = `${this.baseUrl}/genre?query=${query}`;
    return this.http.get<Movie[]>(url);
  }

  getMovie(movieId: string): Observable<Movie> {
    const url = `${this.baseUrl}/getMovie?id=${movieId}`;
    return this.http.get<Movie>(url);
  }
  //add trending
}
