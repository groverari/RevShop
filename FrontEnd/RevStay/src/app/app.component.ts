import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { HotelListComponent } from './components/user-home/hotel-list/hotel-list.component';
import { RegisterComponent } from './components/register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    HotelListComponent,
    RegisterComponent,
    HotelComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'RevStay';
  constructor(private router: Router) {}
}
