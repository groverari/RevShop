import { Component, Input } from '@angular/core';
import { Hotel } from '../../../models/hotel';
import { Review } from '../../../models/review';
import { FieldsetModule } from 'primeng/fieldset';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ReviewService } from '../../../services/review/review.service';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-review-view',
  standalone: true,
  imports: [
    FormsModule,
    FieldsetModule,
    RatingModule,
    AvatarModule,
    ButtonModule,
    DialogModule,
    InputTextareaModule,
    MessageModule,
    FeedbackComponent
  ],
  providers: [MessageService],
  templateUrl: './review-view.component.html',
  styleUrl: './review-view.component.css',
})
export class ReviewViewComponent {
  @Input({ alias: 'inputHotel' }) hotel!: Hotel;
  @Input({ alias: 'inputAvgRating' }) avgRating!: number;

  dialogVisible: boolean = false;
  reviewRating?: number;
  reviewText?: string;
  submitClicked: boolean = false;

  constructor(
    private reviewService: ReviewService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // console.log(this.hotel);
  }

  showDialog() {
    this.dialogVisible = true;
  }

  closeDialog() {
    this.dialogVisible = false;
  }
  submitReview() {
    this.submitClicked = true;
    if (!this.reviewRating) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Rating is required',
      });
    } else if (!this.reviewText) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Review text is required',
      });
    } else {
      const hotelToPass: Hotel = {
        hotelId: this.hotel.hotelId,
        businessId: this.hotel.businessId,
        name: this.hotel.name,
        description: this.hotel.description,
        street: this.hotel.street,
        city: this.hotel.city,
        state: this.hotel.state,
        zip: this.hotel.zip,
        img: this.hotel.img,
      };
      this.reviewService
        .addReview('users/review/', {
          rating: this.reviewRating,
          text: this.reviewText,
          userId: JSON.parse(localStorage.getItem('currentUser')!).userId,
          hotel: hotelToPass,
        })
        .subscribe({
          next: (next) => {
            this.closeDialog();
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
