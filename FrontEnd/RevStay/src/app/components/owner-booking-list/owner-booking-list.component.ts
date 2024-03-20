import { Component } from '@angular/core';
import { OwnerBookingComponent } from './owner-booking/owner-booking.component';
import { BookingService } from '../../services/booking/booking.service';
import { Owner } from '../../models/owner';
import { Booking } from '../../models/booking';

@Component({
  selector: 'app-owner-booking-list',
  standalone: true,
  imports: [OwnerBookingComponent],
  templateUrl: './owner-booking-list.component.html',
  styleUrl: './owner-booking-list.component.css'
})
export class OwnerBookingListComponent {
  constructor(
    private bookingService: BookingService
  ) {}
  ngOnInit() {
    console.log("Initializing user booking list")
    let anOwner = localStorage.getItem('currentUser');
    if(anOwner){this.owner = JSON.parse(anOwner);}
    this.populateBookings();
  }

  //useful variables
  owner: Owner|null = null;
  bookings: Booking[] = [];

  //Creating the bookings list based on userId
  populateBookings(){
    this.bookingService.getOwnerBookings(this.owner?.businessId + "").subscribe({
      next: (response) => {
        this.bookings = response;
        console.log("Booking list:", response);
      },
      error: (error) => {
        console.log("Could not retrieve owner bookings: ", error);
      }
    });
  }
}
