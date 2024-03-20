import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RegisterService } from '../../services/register/register.service';
import { User } from '../../models/user';
import { Owner } from '../../models/owner';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, SelectButtonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

    //For loading the component
    constructor(
      private primengConfig: PrimeNGConfig,
      private registerService: RegisterService,
      private router: Router
    ) {}

    ngOnInit() {
      this.primengConfig.ripple = true;
      this.registerForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
      });
    }

    //Variables interacting with HTML
    registerForm!: FormGroup;
    userType: string = 'User';
    registerError: string = '';
    formError: string = '';
    //Select button options
    stateOptions = [
      { label: 'User', value: 'User' },
      { label: 'Hotel Owner', value: 'Owner' },
    ];

    //Functions for HTML Buttons
    login() {
      console.log('login');
      this.router.navigate(['/login']);
    }

    onSubmit(form: FormGroup){
      if(form.valid){
        this.formError = '';
        if(this.userType === "User"){
          this.registerUser(form);
        }
        else{
          this.registerOwner(form);
        }
      }
      else{
        this.error();
      }
    }

    //Registration
    registerUser(form: FormGroup){
      console.log('Valid?', form.valid); // true or false
      console.log(form.value)
      this.registerService
        .userRegistration(form.value.email, form.value.password, form.value.firstName, form.value.lastName)
        .subscribe({
          next: (response) => {
            console.log(response);
            let user: User = {
              userId: response.userId,
              email: response.email,
              firstName: response.firstName,
              lastName: response.lastName,
            };
            console.log('User registered successfully', user);
            localStorage.setItem('accountType', 'user');
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['/user/home']);
          },
          error: (error) => {
            this.registerError = "Could not create account";
          },
        });
    }

    registerOwner(form: FormGroup){
      console.log('Valid?', form.valid); // true or false
      console.log(form.value)
      this.registerService
        .ownerRegistration(form.value.email, form.value.password, form.value.firstName, form.value.lastName)
        .subscribe({
          next: (response) => {
            console.log(response);
            let owner: Owner = {
              businessId: response.businessId,
              email: response.email,
              firstName: response.firstName,
              lastName: response.lastName,
            };
            console.log('Owner registered successfully', owner);
            localStorage.setItem('accountType', 'owner');
            localStorage.setItem('currentUser', JSON.stringify(owner));
            this.router.navigate(['/owner/hotel-management']);
          },
          error: (error) => {
            this.registerError = "Could not create account";
          },
        });
    }

    error(): void {
      if (!this.registerForm.value.email) {
        this.formError = 'Email is required';
      } else if (this.registerForm.get('email')?.invalid) {
        this.formError = 'Invalid email';
      } else if (!this.registerForm.value.password) {
        this.formError = 'Password is required';
      }else if (!this.registerForm.get('firstName') || !this.registerForm.get('firstName')){
        this.formError = 'Must include First/Last name';
      }
    }


}