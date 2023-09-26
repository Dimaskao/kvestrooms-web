import { Component, EventEmitter, Output } from '@angular/core';
import { RoomsService } from '../services/rooms.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {
  HttpClient,
  HttpHeaders,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css'],
})
export class RoomFormComponent {
  isComplete: boolean = false;
  progress: number = 0;
  message: string = '';
  @Output() public onUploadFinished = new EventEmitter();
  response: { dbPath: '' } = { dbPath: '' };

  constructor(
    public roomsService: RoomsService,
    private router: Router,
    private httpClient: HttpClient,
    private as: AuthService,
  ) {}

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
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

  saveRoom(name: string, description: string) {
    if (name == '' || description == '' || !this.isComplete) {
      alert('Заповніть всі поля та дочекайтесь завантаження файла!');
      return;
    }
    this.roomsService
      .addRoom(name, description, this.response.dbPath)
      .subscribe(
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
