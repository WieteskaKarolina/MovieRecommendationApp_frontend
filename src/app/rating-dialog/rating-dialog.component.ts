import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.css'],
})
export class RatingDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<RatingDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
      ) {}
    
      onRatingUpdated(rating: number) {
        this.dialogRef.close(rating);
      }
    
      closeDialog() {
        this.dialogRef.close();
      }
}