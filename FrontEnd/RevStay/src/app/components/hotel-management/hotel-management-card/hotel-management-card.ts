import { Component, Input } from '@angular/core';
import { Hotel } from '../../../models/hotel';
import { TransferService } from '../../../services/transfer/transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-management-card',
  standalone: true,
  imports: [],
  template: `<div id="card-container">
    <h2>{{ hotel.name }}</h2>
    <p>
      {{ hotel.street }}, {{ hotel.city }} {{ hotel.state }}, {{ hotel.zip }}
    </p>
    <div class="btn-group">
      <button class="primary-btn" (click)="editHotel()">
        Edit Hotel Details
      </button>
      <button class="primary-btn" (click)="showReview()">Reviews</button>
      <button class="primary-btn" (click)="roomManger()">
        View and Add Rooms
      </button>
    </div>
  </div>`,
  styles: `#card-container{margin: 5px; padding: 10px;
                        background-color: #90e0ef; border-radius: 10px;
                        text-align: center;}
            .btn-group{display: flex; justify-content: space-between; margin: 5px;}`,
})
export class HotelManagementCard {
  @Input() hotel!: Hotel;

  constructor(
    private transferService: TransferService,
    private router: Router
  ) {}

  editHotel() {
    this.transferService.setHotel(this.hotel);
    this.router.navigateByUrl('owner/edit-hotel');
  }

  roomManger() {
    this.transferService.setHotel(this.hotel);
    this.router.navigateByUrl('owner/room-management');
  }

  showReview() {
    this.transferService.setHotel(this.hotel);
    //this.router.navigate(['/owner/reviews',this.hotel.hotelId]);
    this.router.navigateByUrl('/owner/reviews/'+this.hotel.hotelId?.toString());
  }
}
