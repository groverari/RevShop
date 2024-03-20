import { Component, Input } from '@angular/core';
import { Review } from '../../../../models/review';
import { ReviewService } from '../../../../services/review/review.service';
import { FormsModule } from '@angular/forms';
import { SuccessComponent } from 'app/components/success/success.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-review-card',
  standalone: true,
  imports: [FormsModule, SuccessComponent],
  templateUrl: './owner-review-card.component.html',
  styleUrl: './owner-review-card.component.css',
})
export class OwnerReviewCardComponent {
  @Input() review!: Review;
  response: string = '';
  constructor(private reviewService: ReviewService, private matDiag: MatDialog, private router: Router) {}


  openSuccess(): void {
    const dialogRef = this.matDiag.open(SuccessComponent, {
      width: '300px',
      data: 'Successfully responded to Review. Click this button to return to the hotel management screen',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigateByUrl('/owner/hotel-management');
    });
  }


  respond(): void {
    if (this.review && this.response.length > 0) {

      const myRev: Review = {
        reviewId: this.review.reviewId,
        feedback: this.response,
      };

      this.reviewService.submitFeedbackToReview(myRev).subscribe({
        next: (response) => {
          this.openSuccess();
        },
      });
    } else {
      console.log('Unable to send feedback');
    }
  }
}
