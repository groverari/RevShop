import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { Room } from '../../models/room';
import { Options } from '../../models/http';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private apiService: ApiService) {}

  getRoomsByHotelId = (path: string): Observable<Room[]> => {
    return this.apiService.get(path, { responseType: 'json' });
  };

  getMinPriceByHotelId = (path: string): Observable<number> => {
    return this.apiService.get(path, { responseType: 'json' });
  };
  // we need create room
  addRoom(room: Room): Observable<Room> {
    return this.apiService.create('owners/addRoom', room);
  }

  updateRoom(room: Room): Observable<Room> {
    return this.apiService.update('owners/updateRoom', room);
  }
  // we need delete room
  deleteRoom(roomId: number): Observable<boolean> {
    return this.apiService.delete(`owners/deleteRoom`, {
      params: { roomId: roomId },
    });
  }
}
