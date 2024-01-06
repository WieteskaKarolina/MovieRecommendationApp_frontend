// comment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../_models/comment.model';
import { CommunicationService } from './communication.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/api/movies';

  constructor(
    private http: HttpClient,
    private communicationService: CommunicationService,
    private tokenStorageService: TokenStorageService
  ) {}

  getCommentsForMovie(movieId: number): Observable<Comment[]> {
    const url = `${this.apiUrl}/getCommentsForMovie?movieId=${movieId}`;
    return this.http.get<Comment[]>(url);
  }

  addComment(movieId: number, text: string): Observable<any> {
    const url = `${this.apiUrl}/addComment`;
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.post(url, { movieId: movieId, text: text }, { headers });
  }

  // likeComment(commentId: number): Observable<Comment> {
  //   const url = `${this.apiUrl}/likeComment`;
  //   const token = this.tokenStorageService.getToken();
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   });

  //   return this.http.post<Comment>(url, {commentId}, { headers });
  // }
}

