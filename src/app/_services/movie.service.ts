import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../_models/movie.model';
import { CommunicationService } from './communication.service';
import { TokenStorageService } from './token-storage.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'http://localhost:8080/api/movies';
  private watchedMovies: Movie[] = [];
  private watchLaterMovies: Movie[] =[];

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

    const token = this.tokenStorageService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Movie[]>(url, { headers });
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

    const token = this.tokenStorageService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.baseUrl}/ratings`, ratingDto, { headers });
  }


  getRateForMovie(movieId: number): Observable<any> {
    const token = this.tokenStorageService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.baseUrl}/ratings/${movieId}`, { headers });  //retun number
  }

  addMovieToWatched(movieId: number): Observable<any> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.baseUrl}/addMovieToWatched/${movieId}`,{movieId}, { headers });
  }

  deleteMovieFromWatched(movieId: number): Observable<any> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.baseUrl}/deleteMovieFromWatched/${movieId}`,{movieId}, { headers });
  }
  

  getWatchedMovies(): Observable<Movie[]> {
    const token = this.tokenStorageService.getToken();
    if (!token) {
      console.error('Token not available');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Movie[]>(`${this.baseUrl}/getWatchedMovies`, { headers }).pipe(
      tap((watchedMovies: Movie[]) => this.watchedMovies = watchedMovies)
    );
  }

  isMovieInWatchedList(movieId: number): boolean {
    if (this.watchedMovies.length === 0) {
      // If watchedMovies array is empty, fetch the watched movies
      this.getWatchedMovies().subscribe();
    }
    return this.watchedMovies.some(movie => movie.movie_id === movieId);
  }

  getWatchLaterList(): Observable<Movie[]> {
    const token = this.tokenStorageService.getToken();
    if (!token) {
      console.error('Token not available');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Movie[]>(`${this.baseUrl}/getWatchLaterList`, { headers }).pipe(
      tap((watchLaterMovies: Movie[]) => this.watchLaterMovies = watchLaterMovies)
    );
  }

  addMovieToWatchLater(movieId: number): Observable<any> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.baseUrl}/addMovieToWatchLater/${movieId}`,{movieId}, { headers });
  }

  removeMovieFromWatchLater(movieId: number): Observable<any> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.baseUrl}/removeMovieFromWatchLater/${movieId}`,{movieId}, { headers });
  }
  
  isMovieInWatchLaterMovies(movieId: number): boolean {
    if (this.watchLaterMovies.length === 0) {
      this.getWatchLaterList().subscribe();
    }
    return this.watchLaterMovies.some(movie => movie.movie_id === movieId);
  }
}
