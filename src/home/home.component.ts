import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../services/rooms.service';
import { RoomModel } from 'src/models/room.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  rooms: any;
  constructor(public roomsService: RoomsService) {}

  ngOnInit(): void {
    this.roomsService.getRooms().subscribe(
      (data: RoomModel[]) => {
        this.rooms = data;
      },
      (error) => {
        console.error('Error:', error);
      },
    );
  }
}
