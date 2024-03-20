import { Component } from '@angular/core';
import { Hotel } from '../../../models/hotel';
import { Room } from '../../../models/room';
import { RoomCardComponent } from './room-card/room-card.component';
import { TransferService } from '../../../services/transfer/transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-management',
  standalone: true,
  imports: [RoomCardComponent],
  templateUrl: './room-management.component.html',
  styleUrl: './room-management.component.css',
})
export class RoomManagementComponent {
  hotel!: Hotel;
  rooms?: Room[];

  constructor(
    private transferService: TransferService,
    private router: Router
  ) {}

  ngOnInit() {
    this.hotel = this.transferService.getHotel();
    if (!this.hotel) {
      //There is no room that has been selected and we need to return to the home page
      this.goBack();
    }

    if (!this.hotel.roomList) {
      this.rooms = [];
    } else {
      this.rooms = this.hotel.roomList;
      this.rooms = this.rooms.map((room) => {
        room.hotelId = this.hotel.hotelId || 0;
        return room;
      });
    }
  }

  goBack(): void {
    this.router.navigateByUrl('/owner/hotel-management');
  }

  addRoom(): void {
    this.router.navigateByUrl('/owner/add-room');
  }
}
