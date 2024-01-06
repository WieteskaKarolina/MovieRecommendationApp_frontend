// comment.component.ts
import { Component, Input } from '@angular/core';
import { CommentService } from '../_services/comment.service';
import { Comment } from '../_models/comment.model'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() movieId!: number;
  comments: Comment[] = [];
  newComment: string = '';

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.commentService.getCommentsForMovie(this.movieId).subscribe((comments) => {
        this.comments = comments;
    });
  }

  postComment() {
    if (this.newComment.trim() !== '') {
      this.commentService.addComment(this.movieId, this.newComment).subscribe((response) => {
        console.log('Comment posted successfully:', response);
        // Refresh comments
        this.commentService.getCommentsForMovie(this.movieId);
      }, (error) => {
        console.error('Error posting comment:', error);
      });
    }
  }
}
