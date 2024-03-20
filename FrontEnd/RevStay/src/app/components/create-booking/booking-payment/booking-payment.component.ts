import { Component, Input, SimpleChanges } from '@angular/core';
import { Booking } from 'app/models/booking';
import { BookingService } from 'app/services/booking/booking.service';
import { PanelModule } from 'primeng/panel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { SplitterModule } from 'primeng/splitter';
import { Room } from 'app/models/room';
import { Hotel } from 'app/models/hotel';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-booking-payment',
  standalone: true,
  imports: [
    PanelModule,
    IconFieldModule,
    InputIconModule,
    InputMaskModule,
    FormsModule,
    SplitterModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    CurrencyPipe
  ],
  templateUrl: './booking-payment.component.html',
  styleUrl: './booking-payment.component.css',
})
export class BookingPaymentComponent {
  //For loading the component
  constructor(private bookingService: BookingService, private router: Router) {}
  @Input({ alias: 'booking' }) booking!: Booking;
  @Input({ alias: 'room' }) room!: Room;
  @Input({ alias: 'hotel' }) hotel!: Hotel;

  ngOnChanges(changes: SimpleChanges) {
    if (this.booking) {
      this.days =
        (this.booking.checkOut.getTime() - this.booking.checkIn.getTime()) /
        (1000 * 3600 * 24);
      this.price = this.room.price * this.days * this.booking.numRooms;

      this.cols = [
        { field: 'hotel', header: 'Hotel' },
        { field: 'room', header: 'Room' },
        { field: 'quantity', header: '# of Rooms' },
        { field: 'duration', header: 'Duration' },
        { field: 'total', header: 'Total' },
      ];

      this.data = [
        { hotel: this.hotel.name },
        { room: this.room.roomName },
        { quantity: this.booking.numRooms },
        { duration: this.days },
        { total: `$${this.price}` },
      ];

      this.exportCols = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
    }
  }

  //Values for form
  creditCardNumber: number = 0;
  fullName: string = '';
  expires: string = '';
  cvc: number = 0;

  //Finding total
  days?: number;
  price?: number;

  //Other
  checkedOut: boolean = false;
  invoice = [1];
  cols: any[] = [];
  exportCols: any[] = [];
  data: any[] = [];

  createBooking() {
    this.bookingService.createBooking(this.booking).subscribe({
      next: (response) => {
        console.log('Created booking:', response);
        this.checkedOut = true;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  returnHome() {
    this.router.navigateByUrl('/user/home');
  }
}
