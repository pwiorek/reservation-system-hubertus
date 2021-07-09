import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Globals } from '../../globals';
import { AuthResponse } from '../entities/authResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(
    private http: HttpClient,
    private globals: Globals,
  ) { }

  authUser(username: string, password: string): Observable<AuthResponse> {
    const requestUrl = `${this.globals.BASE_URL}/auth`;
    return this.http.post<AuthResponse>(requestUrl, { username, password });
  }
}
