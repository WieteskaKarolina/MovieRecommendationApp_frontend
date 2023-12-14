import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../_models/movie.model';
import { CommunicationService } from './communication.service';
import { TokenStorageService } from './token-storage.service';


@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'http://localhost:8080/api/movies';

  constructor(
    private http: HttpClient,
    private communicationService: CommunicationService,
    private tokenStorageService: TokenStorageService
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

  submitRating(movieId: number, rating: number): Observable<any> {
    const ratingDto = { movieId, rating };

    // Get the token from the TokenStorageService
    const token = this.tokenStorageService.getToken();

    // Set the headers with the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    // Make the HTTP post request with the headers
    return this.http.post(`${this.baseUrl}/ratings`, ratingDto, { headers });
  }
  //add trending
}
