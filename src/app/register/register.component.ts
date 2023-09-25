import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private as: AuthService,
    private router: Router,
  ) {}

  register(email: string, password: string) {
    this.as.register(email, password).subscribe(
      (res) => {
        this.router.navigate(['login']);
      },
      (error) => {
        alert('Invalid data!');
      },
    );
  }
}
