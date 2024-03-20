import { Component, Input } from '@angular/core';
import { Room } from '../../../../models/room';
import { Router } from '@angular/router';
import { TransferService } from '../../../../services/transfer/transfer.service';
import { RoomService } from '../../../../services/room/room.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from '../../../success/success.component';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css',
})
export class RoomCardComponent {
  @Input() room!: Room;

  constructor(
    private router: Router,
    private transferService: TransferService,
    private roomService: RoomService,
    private dialog: MatDialog
  ) {}

  editRoom(): void {
    this.transferService.setRoom(this.room);
    this.router.navigateByUrl('owner/edit-room');
  }

  deleteRoom(): void {
    let id = this.room.roomId || 0;
    this.roomService.deleteRoom(id).subscribe({
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
      data: 'Successfully deleted this room. Click this button to return to the hotel management screen',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigateByUrl('/owner/hotel-management');
    });
  }
}
