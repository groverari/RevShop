import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { OwnerNavbarComponent } from './components/owner-navbar/owner-navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { HotelManagementComponent } from './components/hotel-management/hotel-management.component';
import { AddFormComponent } from './components/hotel-management/add-form/add-form.component';
import { EditFormComponent } from './components/hotel-management/edit-form/edit-form.component';
import { RoomManagementComponent } from './components/hotel-management/room-management/room-management.component';
import { AddRoomFormComponent } from './components/hotel-management/add-room-form/add-room-form.component';
import { UserBookingComponent } from './components/user-booking-list/user-booking/user-booking.component';
import { UserBookingListComponent } from './components/user-booking-list/user-booking-list.component';
import { OwnerBookingListComponent } from './components/owner-booking-list/owner-booking-list.component';
import { CreateBookingComponent } from './components/create-booking/create-booking.component';
import { OwnerReviewComponent } from './components/hotel-management/owner-review/owner-review.component';
import { HotelOverviewPageComponent } from './components/hotel-overview-page/hotel-overview-page.component';
import { EditRoomFormComponent } from './components/hotel-management/edit-room-form/edit-room-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'user',
    component: UserNavbarComponent,
    children: [
      { path: 'home', component: UserHomeComponent },
      { path: 'booking', component: UserBookingListComponent },
      { path: 'hotel/:id', component: HotelOverviewPageComponent },
    ],
  },
  {
    path: 'owner',
    component: OwnerNavbarComponent,
    children: [
      { path: 'hotel-management', component: HotelManagementComponent },
      { path: 'add-hotel', component: AddFormComponent },
      { path: 'edit-hotel', component: EditFormComponent },
      { path: 'room-management', component: RoomManagementComponent },
      { path: 'add-room', component: AddRoomFormComponent },
      { path: 'edit-room', component: EditRoomFormComponent },
      { path: 'reviews/:id', component: OwnerReviewComponent },
      { path: 'ownerBooking', component: OwnerBookingListComponent },
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'booking', component: UserBookingListComponent },
];
