import { HttpClient } from '@angular/common/http';
import { Token } from '../models/token.model';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

export const ACCESS_TOKEN_KEY = 'kvestroom_access_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string =
    'https://kvestroomsapi20230925135541.azurewebsites.net/api/';

  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
  ) {}

  login(email: string, password: string): Observable<Token> {
    return this.httpClient
      .post<Token>(`${this.apiUrl}Auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((token) => {
          localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
        }),
      );
  }

  register(email: string, password: string): Observable<Object> {
    return this.httpClient.post(`${this.apiUrl}Auth/register`, {
      email,
      password,
    });
  }

  isAuthenticated(): boolean {
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token && !this.jwtHelper.isTokenExpired(token) ? true : false;
  }

  getAccessToken(): string {
    return localStorage.getItem(ACCESS_TOKEN_KEY) ?? 'error';
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['']);
  }
}
