import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { MenuItem, MessageService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';

import { HotelService } from '../../../services/hotel/hotel.service';
import { Hotel } from '../../../models/hotel';
import { SuccessComponent } from '../../success/success.component';
@Component({
  selector: 'app-add-hotel-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, StepsModule],
  providers: [HotelService, MessageService],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css',
})
export class AddFormComponent {
  ////
  //Class Variables
  ////
  form!: FormGroup;
  error: string = '';
  steps: MenuItem[] | undefined;
  activeIndex: number = 0;
  img: string = '../../../assets/sample-hotel.jpg';

  /////
  //Contructor
  ///////
  constructor(
    private hotelService: HotelService,
    private messageService: MessageService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ////
  //Life Cycle Methods
  ////
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]{2}'),
      ]),
      zip: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{5}'),
      ]),
    });

    this.steps = [
      {
        label: 'Hotel Information',
      },
      {
        label: 'Image Upload',
      },

      {
        label: 'Confirmation',
      },
    ];
  }

  //////
  //Form Methods
  //////
  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.activeIndex++;
    } else {
      form.value.name.error['required'];
      console.log('error');
    }
  }
  prev(): void {
    this.activeIndex--;
  }
  forward(): void {
    this.activeIndex++;
  }

  addHotel(): void {
    let hotel: Hotel = {
      businessId: JSON.parse(localStorage.getItem('currentUser')!).businessId,
      name: this.form.value.name,
      description: this.form.value.description,
      street: this.form.value.street,
      city: this.form.value.city,
      state: this.form.value.state,
      zip: this.form.value.zip,
      img: this.img,
    };

    this.hotelService.createHotel(hotel).subscribe({
      next: (response) => {
        this.openSuccess();
      },
      error: (error) => {
        console.log('uh oh');
      },
    });
  }

  goBack() {
    this.router.navigateByUrl('owner/hotel-management');
  }

  /////////
  //Modal
  /////////
  openSuccess(): void {
    const dialogRef = this.dialog.open(SuccessComponent, {
      width: '300px',
      data: 'Successfully created Hotel. Click this button to return to the hotel management screen',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigateByUrl('/owner/hotel-management');
    });
  }
}
