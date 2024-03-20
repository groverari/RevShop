import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Booking } from '../../../models/booking';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HotelService } from '../../../services/hotel/hotel.service';
import { RoomService } from '../../../services/room/room.service';
import { PrimeNGConfig } from 'primeng/api';
import { Hotel } from '../../../models/hotel';
import { Room } from '../../../models/room';
import { BookingService } from '../../../services/booking/booking.service';

@Component({
  selector: 'app-user-booking',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './user-booking.component.html',
  styleUrl: './user-booking.component.css'
})
export class UserBookingComponent {
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
