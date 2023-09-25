import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(
    private as: AuthService,
    private router: Router,
  ) {}

  login(email: string, password: string) {
    this.as.login(email, password).subscribe(
      (res) => {
        this.router.navigate(['']);
      },
      (error) => {
        alert('Invalid data!');
      },
    );
  }
}
