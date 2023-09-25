import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../services/rooms.service';
import { ActivatedRoute } from '@angular/router';
import { RoomModel } from 'src/models/room.model';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  room: any;

  public get isLoggedIn(): boolean {
    return this.as.isAuthenticated();
  }

  constructor(
    private route: ActivatedRoute,
    public roomsService: RoomsService,
    private as: AuthService,
  ) {}

  ngOnInit(): void {
    this.roomsService
      .getRoom(this.route.snapshot.paramMap.get('id') ?? 'error')
      .subscribe(
        (data: RoomModel) => {
          this.room = data;
        },
        (error) => {
          console.error('Error:', error);
        },
      );
  }
}
