export class Comment {
    commentId: number;
    movieId: number;
    userId: number;
    text: string;
    createdAt: string;
    likes: number;
    userName: string;
  
    constructor(commentId: number, movieId: number, userId: number, text: string, createdAt: string, likes: number, userName: string) {
      this.commentId = commentId;
      this.movieId = movieId;
      this.userId = userId;
      this.text = text;
      this.createdAt = createdAt;
      this.likes = likes;
      this.userName = userName;
    }
  }
  