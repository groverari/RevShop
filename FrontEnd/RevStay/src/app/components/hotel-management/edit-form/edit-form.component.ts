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
import { TransferService } from '../../../services/transfer/transfer.service';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, StepsModule],
  providers: [HotelService, MessageService],
  templateUrl: './edit-form.component.html',
  styleUrls: [
    './edit-form.component.css',
    '../add-form/add-form.component.css',
  ],
})
export class EditFormComponent {
  ////
  //Class Variables
  ////
  hotel!: Hotel;
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
    private transferService: TransferService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.hotel = this.transferService.getHotel();
    if (!this.hotel) {
      this.router.navigateByUrl('owner/hotel-management');
    }

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

    this.form.setValue({
      name: this.hotel.name,
      description: this.hotel.description,
      street: this.hotel.street,
      city: this.hotel.city,
      state: this.hotel.state,
      zip: this.hotel.zip,
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
      this.hotel.name = form.value.name;
      this.hotel.description = form.value.description;
      this.hotel.street = form.value.street;
      this.hotel.city = form.value.city;
      this.hotel.state = form.value.state;
      this.hotel.zip = form.value.zip;
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

  editHotel(): void {
    this.hotel.img = this.img;
    console.log(this.hotel);
    this.hotelService.updateHotel(this.hotel).subscribe({
      next: (response) => {
        this.openSuccess();
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
