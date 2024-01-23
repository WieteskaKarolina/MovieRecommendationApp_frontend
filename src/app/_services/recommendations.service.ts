import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { Movie } from '../_models/movie.model';
import { CommunicationService } from './communication.service';
import { TokenStorageService } from './token-storage.service';
import { tap, switchMap } from 'rxjs/operators';
import { MovieService } from './movie.service';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  private baseUrl = 'http://localhost:4080/recommendations';
  private movieIds: string[] = [];

  constructor(
    private http: HttpClient,
    private communicationService: CommunicationService,
    private tokenStorageService: TokenStorageService,
    private movieService: MovieService
  ) {}

  getRecommendedMovies(): Observable<Movie[]> {
    const userId = this.tokenStorageService.getUserId();
    if (!userId) {
      console.error('User not available');
      return EMPTY; // Return an empty observable or handle the absence of user ID
    }
  
    return this.http.get<{ movie_ids: number[] }>(`${this.baseUrl}/${userId}`).pipe(
      tap((response) => {
        const ids = response.movie_ids;
        if (!Array.isArray(ids)) {
          console.error('Invalid response format:', ids);
          throw new Error('Invalid response format');
        }
        this.movieIds = ids.map(String);
      }),
      switchMap(() => this.movieService.getMoviesByIds(this.movieIds))
    );
  }
  
}
