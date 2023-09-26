import { Component, EventEmitter, Output } from '@angular/core';
import { RoomsService } from '../services/rooms.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RoomModel } from 'src/models/room.model';
import { AuthService } from '../services/auth.service';
import {
  HttpClient,
  HttpHeaders,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
})
export class EditRoomComponent {
  room: any;
  isComplete: boolean = true;
  progress: number = 0;
  message: string = '';
  response: { dbPath: '' } = { dbPath: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public roomsService: RoomsService,
    private httpClient: HttpClient,
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

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    this.isComplete = false;
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.httpClient
      .post(
        'https://kvestroomsapi20230925135541.azurewebsites.net/api/upload',
        formData,
        {
          reportProgress: true,
          observe: 'events',
          headers: new HttpHeaders({
            Authorization: `Bearer ${this.as.getAccessToken()}`,
          }),
        },
      )
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(
              (100 * event.loaded) / (event.total ?? 1),
            );
          else if (event.type === HttpEventType.Response) {
            this.message = 'Завантаження успішне!';
            this.uploadFinished(event.body);
            this.isComplete = true;
          }
        },
        error: (err: HttpErrorResponse) => console.log(err),
      });
  };

  editRoom(name: string, description: string) {
    if (name == '' || description == '' || !this.isComplete) {
      alert('Заповніть всі поля та дочекайтесь завантаження файла!');
      return;
    }
    if (this.response.dbPath == '') {
      this.response.dbPath = this.room.image;
    }
    this.roomsService
      .editRoom(this.room.id, name, description, this.response.dbPath)
      .subscribe(
        (res) => {
          this.router.navigate(['']);
        },
        (error) => {
          console.log(error);
        },
      );
  }

  deleteRoom(id: number) {
    this.roomsService.deleteRoom(id).subscribe(
      (res) => {
        this.router.navigate(['']);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  uploadFinished = (event: any) => {
    this.response = event;
  };
}
