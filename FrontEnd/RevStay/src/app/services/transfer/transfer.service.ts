import { Injectable } from '@angular/core';
import { Hotel } from '../../models/hotel';
import { Room } from '../../models/room';
/**
 * THIS CLASS IS DESIGNED TO REDUCE THE NUMBER OF DATABASE CALLS ESPECIALLY
 * IF THE CALL IS JUST TO GET AN OBJECT THAT WE JUST HAD ON THE PREVIOUS VIEW
 */
@Injectable({
  providedIn: 'root',
})
export class TransferService {
  constructor() {}

  private transferHotel!: Hotel;
  private transferRoom!: Room;

  setHotel(hotel: Hotel): void {
    this.transferHotel = hotel;
  }
  getHotel(): Hotel {
    //console.log(this.transferHotel);
    return this.transferHotel;
  }

  setRoom(room: Room): void {
    this.transferRoom = room;
  }
  getRoom(): Room {
    console.log(this.transferRoom);
    return this.transferRoom;
  }
}
