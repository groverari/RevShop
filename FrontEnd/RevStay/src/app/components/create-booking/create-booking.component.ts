import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Booking } from '../../models/booking';
import { Hotel } from 'app/models/hotel';
import { Room } from 'app/models/room';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { User } from 'app/models/user';
import { BookingPaymentComponent } from './booking-payment/booking-payment.component';

@Component({
  selector: 'app-create-booking',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CardModule, CalendarModule, ButtonModule, InputNumberModule, BookingPaymentComponent],
  templateUrl: './create-booking.component.html',
  styleUrl: './create-booking.component.css'
})
export class CreateBookingComponent {
  
  @Input({ alias: 'hotel' }) hotel?: Hotel;
  @Input({ alias: 'room' }) room?: Room;

  ngOnInit() {
    let aUser = localStorage.getItem('currentUser');
    if(aUser){this.user = JSON.parse(aUser);}
  }

  //Variables interacting with HTML
  numGuests: number = 1;
  numRooms: number = 1;
  rangeDates = [];
  today: Date = new Date()
  checkingOut: boolean = false;

  //Other variables
  user?: User;
  booking?: Booking;

  checkOut(){
    if(this.hotel?.hotelId && this.room?.roomId && this.user?.userId){
      this.booking = {
        hotelId: this.hotel?.hotelId,
        roomId: this.room?.roomId,
        guests: this.numGuests,
        numRooms: this.numRooms,
        userId: this.user?.userId,
        checkIn: this.rangeDates[0],
        checkOut: this.rangeDates[1],
        status: "pending",
        read: false
      }
      console.log(this.booking);
      this.checkingOut = true;
    }
    else{
      console.error("hotel/room/user id is invalid");
    }
  }

  
}
