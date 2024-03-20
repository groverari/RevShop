import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../../services/review/review.service';
import { Review } from '../../../models/review';
import { OwnerReviewCardComponent } from './owner-review-card/owner-review-card.component';
import { Hotel } from '../../../models/hotel';
import { TransferService } from '../../../services/transfer/transfer.service';

@Component({
  selector: 'app-owner-review',
  standalone: true,
  imports: [OwnerReviewCardComponent],
  templateUrl: './owner-review.component.html',
  styleUrl: './owner-review.component.css',
  providers: [ReviewService, TransferService]
})
export class OwnerReviewComponent implements OnInit, OnDestroy{
  id: number = 0;
  private sub: any;
  reviews!: Review[];
  constructor(private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.reviewService.getAllReviewsByHotelId("hotel/reviews/"+this.id.toString()).subscribe({
      next: (response) => {
        this.reviews = response;
        console.log(this.reviews);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  goBack(): void {
    this.router.navigateByUrl('/owner/hotel-management');
  }

  // ALTERNATIVE: retrieve reviewList from hotel --> DOES NOT WORK (can't 'find' hotel object?)
  // hotel!: Hotel;
  // reviews?: Review[];

  // constructor(
  //   private transferService: TransferService,
  //   private router: Router
  // ) {}

  // ngOnInit() {
  //   console.log("Reviews Init");
  //   this.hotel = this.transferService.getHotel();
  //   if (!this.hotel) {
  //     //There is no room that has been selected and we need to return to the home page
  //     this.goBack();
  //   }

  //   if (!this.hotel.reviewList) {
  //     this.reviews = [];
  //   } else {
  //     this.reviews = this.hotel.reviewList;
  //   }
  // }

  // goBack(): void {
  //   this.router.navigateByUrl('/owner/hotel-management');
  // }
}
