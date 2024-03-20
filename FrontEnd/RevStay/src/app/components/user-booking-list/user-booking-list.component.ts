import { Component } from '@angular/core';
import { User } from '../../models/user';
import { Booking } from '../../models/booking';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking/booking.service';
import { UserBookingComponent } from './user-booking/user-booking.component';

@Component({
  selector: 'app-user-booking-list',
  standalone: true,
  imports: [UserBookingComponent],
  templateUrl: './user-booking-list.component.html',
  styleUrl: './user-booking-list.component.css'
})
export class UserBookingListComponent {
  constructor(
    private router: Router,
    private bookingService: BookingService
  ) {}
  ngOnInit() {
    console.log("Initializing user booking list")
    let aUser = localStorage.getItem('currentUser');
    if(aUser){this.user = JSON.parse(aUser);}
    this.populateBookings();
  }
  
  //useful variables
  user: User|null = null;
  bookings: Booking[] = [];

  //Creating the bookings list based on userId
  populateBookings(){
    this.bookingService.getUserBookings(this.user?.userId + "").subscribe({
      next: (response) => {
        this.bookings = response;
        console.log("Booking list:", response);
      },
      error: (error) => {
        console.log("Could not retrieve user bookings: ", error);
      }
    });
  }

  deleteBooking(booking: Booking){
    console.log("Deleting booking from list");
    this.bookings = this.bookings.filter(x => x.booking_id != booking.booking_id);
  }
}
