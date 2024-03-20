import { Component, Input } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HotelService } from '../../../services/hotel/hotel.service';
import { RoomService } from '../../../services/room/room.service';
import { BookingService } from '../../../services/booking/booking.service';
import { Booking } from '../../../models/booking';
import { Hotel } from '../../../models/hotel';
import { Room } from '../../../models/room';

@Component({
  selector: 'app-owner-booking',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './owner-booking.component.html',
  styleUrl: './owner-booking.component.css'
})
export class OwnerBookingComponent {
  constructor(
    private primengConfig: PrimeNGConfig,
    private hotelService: HotelService,
    private roomService: RoomService,
    private bookingService: BookingService
    ){}
  @Input({ alias: 'inputBooking' }) booking?: Booking;

  ngOnInit(){
    this.getHotel();
  }

  //useful variables
  hotel: Hotel|null = null;
  room: Room|null = null;
  hideSelf: String|boolean = false;

  //Getting info
  getHotel(){
    if(this.booking){
      this.hotelService.getHotelById("hotel/"+this.booking?.hotelId.toString()).subscribe({
        next: (response) => {
          this.hotel = response;
        },
        error: (error) => {
          console.log(`Error getting hotel ${this.hotel?.hotelId}:`, error)
        }
      });
    }
  }

  // getRoom(){
  //   if(this.booking){
  //     this.roomService.getRoomById(this.booking?.roomId.toString()).subscribe({
  //       next: (response) => {
  //         this.hotel = response;
  //       }
  //     });
  //   }
  // }

  //Handling buttons
  acceptBooking(bookingId: number){
    if(this.booking){
      this.booking.status = "accepted";
      this.bookingService.updateBooking(this.booking).subscribe({
        next: (response) => {
          console.log("Accepted booking: ", bookingId);
        },
        error: (error) => 
        {
          console.log(`Could not accept booking ${bookingId}: `, error);
        }
      });
    }
  }

  rejectBooking(bookingId: number){
    if(this.booking){
      this.booking.status = "rejected";
      this.bookingService.updateBooking(this.booking).subscribe({
        next: (response) => {
          console.log("Rejected booking: ", bookingId);
        },
        error: (error) => 
        {
          console.log(`Could not reject booking ${bookingId}: `, error);
        }
      });
    }
  }

  cancelBooking(bookingId: number){
    this.bookingService.deleteBookingByID(bookingId.toString()).subscribe({
      next: (response) => {
        console.log("Cancelled booking: ", bookingId);
        this.hideSelf="hidden";
      },
      error: (error) => 
      {
        console.log(`Could not cancel booking ${bookingId}: `, error);
      }
    });
  }
}
