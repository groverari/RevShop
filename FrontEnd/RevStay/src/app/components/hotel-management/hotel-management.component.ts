import { Component, OnInit } from '@angular/core';
import { AddFormComponent } from './add-form/add-form.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { HotelService } from '../../services/hotel/hotel.service';
import { HotelManagementCard } from './hotel-management-card/hotel-management-card';
import { Hotel } from '../../models/hotel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-hotel-management',
  standalone: true,
  imports: [AddFormComponent, HotelManagementCard],
  providers: [HotelService],
  templateUrl: './hotel-management.component.html',
  styleUrl: './hotel-management.component.css',
})
export class HotelManagementComponent {
  option: string = 'add-hotel';

  hotels!: Array<Hotel>;

  constructor(private hotelService: HotelService, private router: Router) {}

  ngOnInit() {
    console.log('onInit');
    const bussinessId = JSON.parse(
      localStorage.getItem('currentUser')!
    ).businessId;
    this.hotelService.getAllHotelsByBusinessId(bussinessId).subscribe({
      next: (response) => {
        this.hotels = response;
        console.log(this.hotels);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  setOption(input: string) {
    this.option = input;
    console.log(this.option);
  }

  addHotel() {
    this.router.navigateByUrl('/owner/add-hotel');
  }
}
