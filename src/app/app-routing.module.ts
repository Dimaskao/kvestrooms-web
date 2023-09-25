import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { RoomComponent } from 'src/room/room.component';
import { AuthComponent } from './auth/auth.component';
import { RoomFormComponent } from 'src/room-form/room-form.component';
import { EditRoomComponent } from '../edit-room/edit-room.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'room/:id', component: RoomComponent },
  {
    path: 'room/:id/edit',
    component: EditRoomComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-quest', component: RoomFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
