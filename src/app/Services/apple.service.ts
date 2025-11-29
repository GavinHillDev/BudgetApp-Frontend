import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface User {
  id: number;
  username: string;
  email: string;
}


@Injectable({
  providedIn: 'root'
})
export class AppleService {

  logApples() {
    console.log("🍎 Apples logged from service!");
  }
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5113/api/Users';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    this.tryRestoreUser();
  }

  /** Called once on page load */
  private tryRestoreUser() {
    const token = localStorage.getItem('token');
    if (!token) return;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get<User>('http://localhost:5113/api/Users/me', { headers, withCredentials: true }).subscribe({
      next: (user) => {
        this.userSubject.next(user);
      },
      error: () => {
        // Token invalid/expired → clear it
        localStorage.removeItem('token');
      }
    });
  }

  setUser(user: User) {
    //console.log(user);
    this.userSubject.next(user);
  }

  loadUser() {
    const token = localStorage.getItem('token');
    if (!token) return;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get<User>(`${this.apiUrl}/me`, {headers})
      .subscribe(user => this.userSubject.next(user) );
   // console.log("Load Success")
   // console.log(this.userSubject.value);
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }
}
