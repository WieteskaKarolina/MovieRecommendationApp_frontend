import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  username?: string;
  searchTerm: string = '';
 

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }
  }

  search() {
    // Manually encode the search term before navigating
    const encodedSearchTerm = decodeURIComponent(this.searchTerm);

    this.router.navigate(['/moviesSearch'], { queryParams: { query: encodedSearchTerm } });
  } 

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
