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

import { RoomService } from '../../../services/room/room.service';
import { TransferService } from '../../../services/transfer/transfer.service';
import { Room } from '../../../models/room';
import { SuccessComponent } from '../../success/success.component';

@Component({
  selector: 'app-add-room-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, StepsModule],
  templateUrl: './add-room-form.component.html',
  styleUrl: './add-room-form.component.css',
})
export class AddRoomFormComponent {
  form!: FormGroup;
  steps: MenuItem[] = [
    {
      label: 'Room Information',
    },
    {
      label: 'Image Upload',
    },

    {
      label: 'Confirmation',
    },
  ];
  activeIndex: number = 0;
  img: string =
    'https://miro.medium.com/v2/resize:fit:1024/0*HELc7Rwz5YjTrFnm.jpg';

  hotelId?: number;

  constructor(
    private roomService: RoomService,
    private router: Router,
    public dialog: MatDialog,
    public transferService: TransferService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0.01)]),
    });
    try {
      this.hotelId = this.transferService.getHotel().hotelId;
    } catch {
      this.router.navigateByUrl('owner/room-management');
    }
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.activeIndex++;
    }
  }

  prev(): void {
    this.activeIndex--;
  }
  next(): void {
    this.activeIndex++;
  }
  addRoom(): void {
    let id = this.hotelId ? this.hotelId : 0;
    const room: Room = {
      hotelId: id,
      roomName: this.form.value.name,
      description: this.form.value.description,
      quantity: this.form.value.quantity,
      price: this.form.value.price,
      img: this.img,
    };
    console.log(room);

    this.roomService.addRoom(room).subscribe({
      next: (response) => {
        this.openSuccess();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openSuccess(): void {
    const dialogRef = this.dialog.open(SuccessComponent, {
      width: '300px',
      data: 'Successfully created Hotel. Click this button to return to the hotel management screen',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigateByUrl('/owner/hotel-management');
    });
  }

  goBack() {
    this.router.navigateByUrl('owner/room-management');
  }
}
