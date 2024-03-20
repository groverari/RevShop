import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { User } from '../../models/user';
import { Owner } from '../../models/owner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, SelectButtonModule, ReactiveFormsModule, CommonModule],
  providers: [LoginService, PrimeNGConfig],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  /////
  //Class Variables
  /////

  myForm!: FormGroup;
  stateOptions = [
    { label: 'User', value: 'User' },
    { label: 'Hotel Owner', value: 'Hotel Owner' },
  ];
  userType: string = 'User';
  //controls = this.myForm.controls;
  emailError: string = '';
  passwordError: string = '';
  loginError: string = '';

  register() {
    console.log('register');
    this.router.navigate(['/register']);
  }

  onSubmit(form: FormGroup) {
    //resetting errors
    this.emailError = '';
    this.passwordError = '';
    if (form.valid) {
      if (this.userType === 'User') {
        this.userLogin(form.value.email, form.value.password);
      } else {
        this.ownerLogin(form.value.email, form.value.password);
      }
    } else {
      this.error();
    }
  }

  error(): void {
    if (!this.myForm.value.email) {
      this.emailError = 'Email is required';
    } else if (this.myForm.get('email')?.invalid) {
      this.emailError = 'Invalid email';
    }
    if (!this.myForm.value.password) {
      this.passwordError = 'Password is required';
    }
  }

  userLogin(email: string, password: string): void {
    this.loginService.userLogin(email, password).subscribe({
      next: (response) => {
        let user: User = {
          userId: response.userId,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
        };
        console.log('User logged in successfully', user);
        localStorage.setItem('accountType', 'user');
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/user/home']);
      },
      error: (error) => {
        this.loginError = 'Please check your email and password';
      },
    });
  }
  ownerLogin(email: string, password: string): void {
    this.loginService.ownerLogin(email, password).subscribe({
      next: (response) => {
        let owner: Owner = {
          businessId: response.businessId,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
        };
        console.log('Owner logged in successfully', owner);
        localStorage.setItem('accountType', 'owner');
        localStorage.setItem('currentUser', JSON.stringify(owner));
        this.router.navigate(['/owner/hotel-management']);
      },
      error: (error) => {
        this.loginError = 'Please check your email and password';
      },
    });
  }
}
