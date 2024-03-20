import { Component, Input } from '@angular/core';
import { Hotel } from '../../models/hotel';
import { CardModule } from 'primeng/card';
import { ReviewService } from '../../services/review/review.service';
import { RoomService } from '../../services/room/room.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [CardModule, RatingModule, FormsModule, RouterModule, CurrencyPipe],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css',
})
export class HotelComponent {
  constructor(
    private reviewService: ReviewService,
    private roomService: RoomService
  ) {}

  @Input({ alias: 'inputHotel' }) hotel!: Hotel;
  link: string = '';
  hotelPrice: number = 0.0;
  hotelRating: number = 0;

  ngOnInit(): void {
    this.getMinPrice();
    this.getAvgRating();
  }

  ngOnChanges() {
    this.getMinPrice();
    this.getAvgRating();
  }

  getMinPrice(): void {
    this.roomService
      .getMinPriceByHotelId('hotel/price/' + this.hotel.hotelId)
      .subscribe((price: number) => {
        this.hotelPrice = price;
      });
  }

  getAvgRating(): void {
    this.reviewService
      .getAvgRatingByHotelId('hotel/rating/' + this.hotel.hotelId)
      .subscribe((rating: number) => {
        this.hotelRating = rating;
      });
  }
}
