import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-start-up-dialog',
  templateUrl: './start-up-dialog.component.html',
  styleUrls: ['./start-up-dialog.component.css'],
})
export class StartUpDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<StartUpDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
      ) {}
    
      onRatingUpdated(rating: number) {
        this.dialogRef.close(rating);
      }
    
      closeDialog() {
        this.dialogRef.close();
      }
}