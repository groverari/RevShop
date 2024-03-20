import { Booking } from '../../models/booking';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private apiService: ApiService) {  }

  createBooking = (booking: Booking): Observable<Booking> => {
    return this.apiService.create('bookings/', booking, {responseType: 'json'})
  }

  getUserBookings = (userId: string): Observable<Booking[]> => {
    return this.apiService.get(`users/bookings/${userId}`, {responseType: 'json'});
  };

  getOwnerBookings = (ownerId: string): Observable<Booking[]> => {
    return this.apiService.get(`owners/bookings/${ownerId}`, {responseType: 'json'});
  };

  updateBooking = (booking: Booking): Observable<Booking[]> => {
    return this.apiService.update(`bookings/`, booking, {responseType: 'json'});
  };

  deleteBookingByID = (bookingId: string): Observable<Booking> => {
    return this.apiService.delete(`users/bookings/${bookingId}`, {responseType: 'json'})
  }
  
}
