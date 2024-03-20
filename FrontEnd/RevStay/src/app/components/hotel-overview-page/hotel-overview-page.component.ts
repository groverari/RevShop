import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../services/hotel/hotel.service';
import { Hotel } from '../../models/hotel';
import { RatingModule } from 'primeng/rating';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Review } from '../../models/review';
import { Room } from '../../models/room';
import { CreateBookingComponent } from '../create-booking/create-booking.component';
import { ReviewViewComponent } from './review-view/review-view.component';

@Component({
  selector: 'app-hotel-overview-page',
  standalone: true,
  imports: [
    FormsModule,
    RatingModule,
    FieldsetModule,
    CardModule,
    ButtonModule,
    ReviewViewComponent,
    CreateBookingComponent,
  ],
  templateUrl: './hotel-overview-page.component.html',
  styleUrl: './hotel-overview-page.component.css',
})

export class HotelOverviewPageComponent {
  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  hotel!: Hotel;
  avgRating!: number;
  minPrice!: number;
  currentlyBooking: boolean = false;
  bookingRoom?: Room;

  // hotelRating:number = this.hotel.roomList
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getHotelById(params['id']);
    });
  }

  getAvgRating(reviews: Review[]): number {
    if (reviews.length) {
      const len = reviews.length;
      let sum = 0;
      for (let i = 0; i < len; i++) {
        const review = reviews.at(i);
        if (review?.rating) {
          sum += review.rating;
        }
      }
      return Math.round(sum / len);
    }
    return 0;
  }

  getMinPrice(rooms: Room[]): number {
    if (rooms.length) {
      const len = rooms.length;
      let min = 1000000;
      for (let i = 0; i < len; i++) {
        const roomPrice = rooms.at(i)?.price;
        if (roomPrice) {
          min = Math.min(roomPrice, min);
        }
      }
      return min;
    }
    return 0;
  }

  getHotelById(id: number): void {
    this.hotelService.getHotelById('hotel/' + id).subscribe((hotel: Hotel) => {
      this.hotel = hotel;
      if (hotel.roomList) {
        this.minPrice = this.getMinPrice(hotel.roomList);
      }
      if (hotel.reviewList) {
        this.avgRating = this.getAvgRating(hotel.reviewList);
      }
    });
  }

  bookRoom(room: Room): void {
    this.bookingRoom = room;
    this.currentlyBooking = true;
  }
}
