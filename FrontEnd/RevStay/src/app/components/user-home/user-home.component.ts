import { Component } from '@angular/core';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [HotelListComponent, SideNavComponent, RouterOutlet],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {

}