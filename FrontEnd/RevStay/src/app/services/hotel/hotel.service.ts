import { Injectable } from '@angular/core';
import { Hotel } from '../../models/hotel';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Options } from '../../models/http';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(private apiService: ApiService) {}

  getAllHotels = (path: string, options: Options): Observable<Hotel[]> => {
    return this.apiService.get(path, options);
  };

  getHotelById = (path: string): Observable<Hotel> => {
    return this.apiService.get(path, { responseType: 'json' });
  };

  getHotelsByFilter = (path: string, options: Options): Observable<Hotel[]> => {
    return this.apiService.get(path, options);
  };

  createHotel(hotel: Hotel) {
    let path: string = 'owners/register/hotel';
    let x = this.apiService.create(path, hotel);
    console.log(x);
    return x as Observable<Hotel>;
  }

  getAllHotelsByBusinessId(businessId: number): Observable<Hotel[]> {
    const options: Options = { params: { id: businessId } };
    return this.apiService.get('owners/getAllForOwner', options);
  }

  updateHotel(hotel: Hotel) {
    return this.apiService.update('owners/updateHotel', hotel);
  }
}
