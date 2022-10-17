import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInStatus = false;

  constructor(private http: HttpClient) {}
  singIn(params: any) {
    return this.http.post(`auth/signin`, params);
  }

  signUp(params: any) {
    return this.http.post(`auth/signup`, params);
  }

  logout() {
    this.clearOfflineData();
    return of(true);
  }

  // Method to clear all offline data
  clearOfflineData(): void {
    window.localStorage.clear();
    this.loggedInStatus = false;
  }
}
