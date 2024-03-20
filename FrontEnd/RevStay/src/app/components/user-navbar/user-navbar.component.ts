import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css',
})
export class UserNavbarComponent {
  constructor(private router: Router) {}
  user: any = localStorage.getItem('currentUser');
  name: string = JSON.parse(this.user).firstName;
  logout() {
    localStorage.removeItem('accountType');
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }
}
