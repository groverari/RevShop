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
  selector: 'app-edit-room-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, StepsModule],
  templateUrl: './edit-room-form.component.html',
  styleUrls: [
    './edit-room-form.component.css',
    '../add-room-form/add-room-form.component.css',
  ],
})
export class EditRoomFormComponent {
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

  room!: Room;

  constructor(
    private roomService: RoomService,
    private router: Router,
    public dialog: MatDialog,
    public transferService: TransferService
  ) {}

  ngOnInit() {
    this.room = this.transferService.getRoom();
    if (!this.room) {
      //There is no room that has been selected and we need to return to the home page
      this.goBack();
    }

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0.01)]),
    });

    this.form.setValue({
      name: this.room.roomName,
      description: this.room.description,
      quantity: this.room.quantity,
      price: this.room.price,
    });
  }

  goBack() {
    this.router.navigateByUrl('owner/room-management');
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

  editRoom(): void {
    const room: Room = {
      roomId: this.room.roomId,
      hotelId: this.room.hotelId,
      roomName: this.form.value.name,
      description: this.form.value.description,
      quantity: this.form.value.quantity,
      price: this.form.value.price,
      img: this.room.img,
    };

    this.roomService.updateRoom(room).subscribe({
      next: (response) => {
        this.openSuccess();
      },
      error: (error) => {
        console.log('uh oh');
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
}
