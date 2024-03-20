import { Component } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SliderModule } from 'primeng/slider';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { HotelService } from '../../../services/hotel/hotel.service';
import { Hotel } from '../../../models/hotel';
import { FilterService } from '../../../services/filter/filter.service';
import { ListboxModule } from 'primeng/listbox';
import { Subscription } from 'rxjs';
import { Filter } from '../../../models/filter';
import { ChipModule } from 'primeng/chip';

interface City {
  name?: string;
}

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    FormsModule,
    RadioButtonModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    SliderModule,
    AccordionModule,
    DividerModule,
    ListboxModule,
    ChipModule,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  constructor(
    private hotelService: HotelService,
    private filterService: FilterService
  ) {}

  cities!: City[];
  selectedCity!: City | undefined;

  selectedRating!: number | undefined;
  selectedPrice!: number | undefined;

  private sub!: Subscription;

  ngOnInit(): void {
    this.getHotelsByCity();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getHotelsByCity(): void {
    this.sub = this.hotelService
      .getAllHotels('hotel', { params: {} })
      .subscribe((hotels: Hotel[]) => {
        const cityNames = new Set<string>();

        hotels.forEach((hotel) => {
          if (hotel.roomList?.length) {
            cityNames.add(hotel.city);
          }
        });

        this.cities = Array.from(cityNames).map((name) => ({ name }));
      });
  }

  handleRatingChange(rating: number): void {
    this.selectedRating = rating;
    this.applyFilter();
  }

  applyFilter() {
    let filter: Filter = {};

    if (this.selectedCity?.name !== undefined) {
      filter['city'] = this.selectedCity.name;
    }

    if (this.selectedRating !== undefined) {
      filter['rating'] = this.selectedRating;
    }

    if (this.selectedPrice !== undefined) {
      filter['price'] = this.selectedPrice;
    }

    this.filterService.changeFilter(filter);
  }

  clear(toClear: any) {
    if (toClear === this.selectedCity?.name) {
      this.selectedCity = undefined;
    }
    if (toClear === this.selectedPrice) {
      this.selectedPrice = undefined;
    }
    if (toClear === this.selectedRating) {
      this.selectedRating = undefined;
    }
    this.applyFilter();
  }
}
