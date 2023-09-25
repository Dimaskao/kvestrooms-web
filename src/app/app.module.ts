import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { RoomComponent } from '../room/room.component';
import { RoomFormComponent } from '../room-form/room-form.component';
import { EditRoomComponent } from '../edit-room/edit-room.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { ACCESS_TOKEN_KEY } from 'src/services/auth.service';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    AuthComponent,
    RoomFormComponent,
    EditRoomComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
