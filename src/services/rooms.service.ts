import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoomModel } from '../models/room.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private apiUrl: string =
    'https://kvestroomsapi20230925135541.azurewebsites.net/api/';

  constructor(
    public httpClient: HttpClient,
    private as: AuthService,
  ) {}

  public getRooms(): Observable<RoomModel[]> {
    return this.httpClient.get<RoomModel[]>(`${this.apiUrl}Rooms`);
  }

  public getRoom(id: string): Observable<RoomModel> {
    return this.httpClient.get<RoomModel>(`${this.apiUrl}Rooms/` + id);
  }

  public addRoom(
    name: string,
    description: string,
    dbPath: string,
  ): Observable<Object> {
    return this.httpClient.post(
      `${this.apiUrl}Rooms`,
      { id: 0, name: name, image: dbPath, description: description },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.as.getAccessToken()}`,
        }),
      },
    );
  }

  public editRoom(
    id: number,
    name: string,
    description: string,
    dbPath: string,
  ): Observable<Object> {
    return this.httpClient.put(
      `${this.apiUrl}Rooms/` + id,
      { id: id, name: name, image: dbPath, description: description },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.as.getAccessToken()}`,
        }),
      },
    );
  }

  deleteRoom(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.apiUrl}Rooms/` + id, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.as.getAccessToken()}`,
      }),
    });
  }
}
