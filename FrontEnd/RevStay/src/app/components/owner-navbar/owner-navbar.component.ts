import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-owner-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './owner-navbar.component.html',
  styleUrl: './owner-navbar.component.css',
})
export class OwnerNavbarComponent {
  constructor(private router: Router) {}
  user: any = localStorage.getItem('currentUser');
  name: string = JSON.parse(this.user).firstName;
  hotel: string = 'default Hotel';
  logout() {
    localStorage.removeItem('accountType');
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }
}
