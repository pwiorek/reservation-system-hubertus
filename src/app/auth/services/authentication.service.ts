import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import jwt_decode, { JwtPayload } from 'jwt-decode';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticationApiService } from 'build/openapi/api/authentication-api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private router: Router,
    private authApi: AuthenticationApiService,
  ) { }

  logIn(username: string, password: string): Observable<void> {
    if (localStorage.getItem('token') != null) {
      this.logOut();
    }
    return this.authApi.auth({username, password}).pipe(
      map(authResponse => {
        localStorage.setItem('token', authResponse.token);
      }));
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth');
  }

  isUserAuthenticated(): boolean {
    if (localStorage.getItem('token') == null || this.isTokenExpired(jwt_decode<JwtPayload>(localStorage.getItem('token')).exp)) {
      return false;
    } else { return true; }
  }

  private isTokenExpired(tokenExp: number): boolean {
    return (Math.floor((new Date()).getTime() / 1000)) >= tokenExp;
  }
}
