import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Movie } from '../_models/movie.model'
import { MovieService } from '../_services/movie.service';
import { MatDialog } from '@angular/material/dialog';
import { StartUpDialogComponent } from '../start-up-dialog/start-up-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  popularMovies: Movie[] = [];
 

  constructor(
    private authService: AuthService,
    private movieService: MovieService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  fetchPopularMovies() {
    this.movieService.getPupularMovies().subscribe((movies) => {
      this.popularMovies = movies;
    });
  }

  openRatingDialogForMovies() {
    this.fetchPopularMovies();
    
    // Iterate over popularMovies and open dialog for each movie
    this.popularMovies.forEach((movie) => {
      const dialogRef = this.dialog.open(StartUpDialogComponent, {
        width: '400px',
        data: {
          movie: movie,
          userRating: 0, // Set the initial rating to 0 for each movie
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result !== undefined) {
          // Handle the result if needed
        }
      });
    });
  }
}
