import { Component, Input, OnInit } from '@angular/core';
import { Hotel } from '../../../models/hotel';
import { HotelComponent } from '../../hotel/hotel.component';
import { HotelService } from '../../../services/hotel/hotel.service';
import { Subscription } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FilterService } from '../../../services/filter/filter.service';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [HotelComponent, AsyncPipe, CommonModule],
  providers: [HotelService],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.css',
})
export class HotelListComponent implements OnInit {
  constructor(
    private hotelService: HotelService,
    private filterService: FilterService
  ) {}

  hotelList: Hotel[] = [];
  private sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.filterService.currentFilter.subscribe((filter) => {
      this.getHotels(filter);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getHotels(filter: any): void {
    this.hotelService
      .getAllHotels('hotel', {
        params: filter,
      })
      .subscribe((hotels: Hotel[]) => {
        this.hotelList = hotels;
      });
  }
}
