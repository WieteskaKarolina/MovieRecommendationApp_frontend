import { TokenStorageService } from './_services/token-storage.service';
import { NavigationExtras, Router } from '@angular/router';
import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  username?: string;
  searchTerm: string = '';
  isDropdownOpen = false;

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const clickedInside = this.el.nativeElement.contains(event.target);
    
    if (!clickedInside) {
      // Clicked outside the dropdown, close it
      this.isDropdownOpen = false;
    }
  }

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private el: ElementRef, 
    private renderer: Renderer2
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

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
