import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WachedMoviesComponent } from './watched-movies.component';

describe('WachedMoviesComponent', () => {
  let component: WachedMoviesComponent;
  let fixture: ComponentFixture<WachedMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WachedMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WachedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
